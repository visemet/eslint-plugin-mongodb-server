#!/usr/bin/env node

const program = require("commander");
const CLIEngine = require('eslint').CLIEngine;

function lint(files, ruleOptions) {
    const cli = new CLIEngine({
        plugins: ["mongodb-server"],
        rules: {"mongodb-server/resmoke-tags": ruleOptions},
        fix: true,
    });

    const report = cli.executeOnFiles(files);
    if (report.errorCount > 0) {
        // We don't attempt to make changes to the specified files if there are non-fixable errors.
        console.error(report.results[0].messages);
        process.exit(2);
    }

    CLIEngine.outputFixes(report);
    return report;
}

program.command("add-tag <tag> [files...]")
    .description("Adds the resmoke.py tag to the list of files")
    .option("-m|--message [message]", "Optional message to include as a comment for the tag")
    .action((tag, files, cmd) => {
        const options = {tag};
        if (cmd.message !== undefined) {
            options.comment = cmd.message;
        }

        lint(files, ["error", {$_internalAddTag: options}]);
    });

program.command("remove-tag <tag> [files...]")
    .description("Removes the resmoke.py tag from the list of files")
    .action((tag, files) => {
        lint(files, ["error", {$_internalRemoveTag: {tag}}]);
    });

program.command("rename-tag <from-tag> <to-tag> [files...]")
    .description("Renames the resmoke.py tag in the list of files")
    .action((tag, files) => {
        lint(files, ["error", {$_internalRenameTag: {from: fromTag, toTag: toTag}}]);
    });

program.command("list-tags [files...]")
    .description("Lists the resmoke.py tags used in the list of files")
    .action((files) => {
        const report = lint(files, ["warn", {$_internalListTags: null}]);
        console.log(report);
    });

program.parse(process.argv);
