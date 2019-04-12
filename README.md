# eslint-plugin-mongodb-server

Custom ESlint rules for MongoDB's JavaScript integration tests.

## Installation

```
$ npm install -g eslint-plugin-mongodb-server
```

## Usage

```
$ resmoke-tags --help

  Usage: resmoke-tags [options] [command]

  Options:

    -h, --help                                 output usage information

  Commands:

    format [files...]                          Automatically formats the resmoke.py tags in list of files
    add-tag [options] <tag> [files...]         Adds the resmoke.py tag to the list of files
    remove-tag <tag> [files...]                Removes the resmoke.py tag from the list of files
    rename-tag <from-tag> <to-tag> [files...]  Renames the resmoke.py tag in the list of files
    list-tags [files...]                       Lists the resmoke.py tags used in the list of files
    find-tag <tag> [files...]                  Lists the files which use the resmoke.py tag
```
