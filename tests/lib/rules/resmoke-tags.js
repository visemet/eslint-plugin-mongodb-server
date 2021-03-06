/**
 * @fileoverview Enforce a particular style and formatting for resmoke.py tags.
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/resmoke-tags");
const RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("resmoke-tags", rule, {

    valid: [
        {
          code: (function blockCommentSpanningMultipleLines() {
                    /**
                     * @tags: [
                     *   tag1,
                     *   tag2,
                     * ]
                     */
                }).toString()
        },

        {
          code: (function blockCommentSpanningMultipleLinesWithInlineComments() {
                    /**
                     * @tags: [
                     *   # comment for tags1
                     *   tag1,
                     *   # multi-line < . . . . . . . . . . . . . . . . . . . . . . . filler text >
                     *   # comment for tags2
                     *   tag2,
                     * ]
                     */
                }).toString()
        },

        {
          code: (function blockCommentSpanningMultipleLinesWithHeaderComment() {
                    /**
                     * This comment is unrelated to the tags.
                     *
                     * @tags: [
                     *   tag1,
                     *   tag2,
                     * ]
                     */
                }).toString()
        },

        {
          code: (function lineCommentSpanningMultipleLines() {
                    //
                    // @tags: [
                    //   tag1,
                    //   tag2,
                    // ]
                    //
                }).toString()
        },

        {
          code: (function lineCommentSpanningMultipleLinesWithInlineComments() {
                    //
                    // @tags: [
                    //   # comment for tags1
                    //   tag1,
                    //   # multi-line < . . . . . . . . . . . . . . . . . . . . . . . filler text >
                    //   # comment for tags2
                    //   tag2,
                    // ]
                    //
                }).toString()
        },

        {
          code: (function addingTagAlreadyPresent() {
                    /**
                     * @tags: [
                     *   tag1,
                     *   tag2,
                     *   tag3,
                     * ]
                     */
                }).toString(),

          options: [{$_internalAddTag: {tag: "tag2"}}],
        },

        {
          code: (function removingTagNotPresent() {
                    /**
                     * @tags: [
                     *   tag1,
                     *   tag3,
                     * ]
                     */
                }).toString(),

          options: [{$_internalRemoveTag: "tag2"}],
        },

        {
          code: (function renamingTagNotPresent() {
                    /**
                     * @tags: [
                     *   tag1,
                     *   tag3,
                     * ]
                     */
                }).toString(),

          options: [{$_internalRenameTag: {from: "tag2", to: "tag1"}}],
        },
    ],

    invalid: [
        {
          code:  //
              (function missingSpaceBetweenTags() {
                  /**
                   * @tags: [tag1,tag2]
                   */
              }).toString(),

          errors: 1,
          output:  //
              (function missingSpaceBetweenTags() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag2,
                   * ]
                   */
              }).toString()
        },

        {
          code:  //
              (function missingSpaceBetweenTagsWithSurroundingComments() {
                  /**
                   * This comment is unrelated to the tags.
                   *
                   * @tags: [tag1,tag2]
                   *
                   * This comment is also unrelated to the tags.
                   */
              }).toString(),

          errors: 1,
          output:  //
              (function missingSpaceBetweenTagsWithSurroundingComments() {
                  /**
                   * This comment is unrelated to the tags.
                   *
                   * @tags: [
                   *   tag1,
                   *   tag2,
                   * ]
                   *
                   * This comment is also unrelated to the tags.
                   */
              }).toString()
        },

        {
          code:  //
              (function missingTrailingComma() {
                  //
                  // @tags: [
                  //   tag1,
                  //   tag2
                  // ]
                  //
              }).toString(),

          errors: 1,
          output:  //
              (function missingTrailingComma() {
                  //
                  // @tags: [
                  //   tag1,
                  //   tag2,
                  // ]
                  //
              }).toString()
        },

        {
          code:  //
              (function missingTrailingCommaWithSurroundingComments() {
                  // This comment is unrelated to the tags.
                  //
                  // @tags: [
                  //   tag1,
                  //   tag2
                  // ]
                  //
                  // This comment is also unrelated to the tags.
              }).toString(),

          errors: 1,
          output:  //
              (function missingTrailingCommaWithSurroundingComments() {
                  // This comment is unrelated to the tags.
                  //
                  // @tags: [
                  //   tag1,
                  //   tag2,
                  // ]
                  //
                  // This comment is also unrelated to the tags.
              }).toString()
        },

        {
          code:  //
              (function addingNewTag() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag3,
                   * ]
                   */
              }).toString(),
          options: [{$_internalAddTag: {tag: "tag2"}}],

          errors: 1,
          output:  //
              (function addingNewTag() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag2,
                   *   tag3,
                   * ]
                   */
              }).toString()
        },

        {
          code:  //
              (function addingTagAlreadyPresentButInWrongOrder() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag3,
                   *   tag2,
                   * ]
                   */
              }).toString(),
          options: [{$_internalAddTag: {tag: "tag2"}}],

          errors: 1,
          output:  //
              (function addingTagAlreadyPresentButInWrongOrder() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag2,
                   *   tag3,
                   * ]
                   */
              }).toString()
        },

        {
          code:  //
              (function addingNewTagWithAComment() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag3,
                   * ]
                   */
              }).toString(),
          options: [{$_internalAddTag: {tag: "tag2", comment: "This is a comment for tag2."}}],

          errors: 1,
          output:  //
              (function addingNewTagWithAComment() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   # This is a comment for tag2.
                   *   tag2,
                   *   tag3,
                   * ]
                   */
              }).toString()
        },

        {
          code:  //
              `
function addingNewTagWithoutExistingTagsAnnotationOrComment() {
    var x = 1;
}`,
          options: [{$_internalAddTag: {tag: "tag2", comment: "This is a comment for tag2."}}],

          errors: 1,
          output:  //
              `
/**
 * @tags: [
 *   # This is a comment for tag2.
 *   tag2,
 * ]
 */
function addingNewTagWithoutExistingTagsAnnotationOrComment() {
    var x = 1;
}`
        },

        {
          code:  //
              (function addingNewTagWithoutExistingTagsAnnotationButHasBlockComment() {
                  var a = 1;
                  /**
                   * This is a comment that likely describes what the test is meant to do.
                   */
                  var b = 2;
              }).toString(),
          options: [{$_internalAddTag: {tag: "tag2", comment: "This is a comment for tag2."}}],

          errors: 1,
          output:  //
              (function addingNewTagWithoutExistingTagsAnnotationButHasBlockComment() {
                  var a = 1;
                  /**
                   * This is a comment that likely describes what the test is meant to do.
                   * @tags: [
                   *   # This is a comment for tag2.
                   *   tag2,
                   * ]
                   */
                  var b = 2;
              }).toString()
        },

        {
          code:  //
              (function addingNewTagWithoutExistingTagsAnnotationButHasLineComment() {
                  var a = 1;
                  // This is a comment that likely describes what the test is meant to do.
                  var b = 2;
              }).toString(),
          options: [{$_internalAddTag: {tag: "tag2", comment: "This is a comment for tag2."}}],

          errors: 1,
          output:  //
              (function addingNewTagWithoutExistingTagsAnnotationButHasLineComment() {
                  var a = 1;
                  // This is a comment that likely describes what the test is meant to do.
                  // @tags: [
                  //   # This is a comment for tag2.
                  //   tag2,
                  // ]
                  var b = 2;
              }).toString()
        },

        {
            code:  //
                (function addingNewTagWithoutExistingTagsAnnotationButHasMultiLineComment() {
                    var a = 1;
                    // This is a multi-line comment
                    // that likely describes
                    // what the test is meant to do.
                    var b = 2;
                }).toString(),
            options: [{ $_internalAddTag: { tag: "tag2", comment: "This is a comment for tag2." } }],

            errors: 1,
            output:  //
                (function addingNewTagWithoutExistingTagsAnnotationButHasMultiLineComment() {
                    var a = 1;
                    // This is a multi-line comment
                    // that likely describes
                    // what the test is meant to do.
                    // @tags: [
                    //   # This is a comment for tag2.
                    //   tag2,
                    // ]
                    var b = 2;
                }).toString()
        },

        {
          code:  //
              `
function addingNewTagWithoutExistingTagsAnnotationButHasUnrelatedLineComment() {
    var a = 1;
    var b = 2;  // This isn't a comment that describes what the test is meant to do.
}`,
          options: [{$_internalAddTag: {tag: "tag2", comment: "This is a comment for tag2."}}],

          errors: 1,
          output:  //
              `
/**
 * @tags: [
 *   # This is a comment for tag2.
 *   tag2,
 * ]
 */
function addingNewTagWithoutExistingTagsAnnotationButHasUnrelatedLineComment() {
    var a = 1;
    var b = 2;  // This isn't a comment that describes what the test is meant to do.
}`
        },

        {
          code:  //
              `
function addingNewTagWithoutExistingTagsAnnotationButHasUnrelatedBlockComment() {
    var a = 1;
    var b = 2;  /* This isn't a comment that describes what the test is meant to do. */
}`,
          options: [{$_internalAddTag: {tag: "tag2", comment: "This is a comment for tag2."}}],

          errors: 1,
          output:  //
              `
/**
 * @tags: [
 *   # This is a comment for tag2.
 *   tag2,
 * ]
 */
function addingNewTagWithoutExistingTagsAnnotationButHasUnrelatedBlockComment() {
    var a = 1;
    var b = 2;  /* This isn't a comment that describes what the test is meant to do. */
}`
        },

        {
          code:  //
              (function updatingCommentOfExistingTag() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   # This is an existing comment for tag2.
                   *   tag2,
                   *   tag3,
                   * ]
                   */
              }).toString(),
          options: [{$_internalAddTag: {tag: "tag2", comment: "This is a NEW comment for tag2."}}],

          errors: 1,
          output:  //
              (function updatingCommentOfExistingTag() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   # This is a NEW comment for tag2.
                   *   tag2,
                   *   tag3,
                   * ]
                   */
              }).toString()
        },

        {
          code:  //
              (function renamingExistingTag() {
                  /**
                   * @tags: [
                   *   tag2,
                   * ]
                   */
              }).toString(),
          options: [{$_internalRenameTag: {from: "tag2", to: "tag1"}}],

          errors: 1,
          output:  //
              (function renamingExistingTag() {
                  /**
                   * @tags: [
                   *   tag1,
                   * ]
                   */
              }).toString()
        },

        {
          code: (function renamingExistingTagToAnotherAlreadyExistingTag() {
                    /**
                     * @tags: [
                     *   tag1,
                     *   tag2,
                     * ]
                     */
                }).toString(),
          options: [{$_internalRenameTag: {from: "tag2", to: "tag1"}}],
          errors: [{message: "Tag 'tag1' already exists in the file"}],
        },

        {
          code:  //
              (function removingExistingTag() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag2,
                   *   tag3,
                   * ]
                   */
              }).toString(),
          options: [{$_internalRemoveTag: "tag2"}],

          errors: 1,
          output:  //
              (function removingExistingTag() {
                  /**
                   * @tags: [
                   *   tag1,
                   *   tag3,
                   * ]
                   */
              }).toString()
        },
    ],
});
