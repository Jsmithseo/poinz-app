"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseCsvDataUrlToStories;

var _uuid = require("uuid");

var _papaparse = require("papaparse");

var _getLogger = _interopRequireDefault(require("../getLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOGGER = (0, _getLogger.default)('storyImportParser');
/**
 * parses the given data url (data:text/csv;base64,U3VtbWFyeSxJc3N1ZSBrZXksSXNzdW.......) containing a list of "issues" (e.g. from jira)
 * into Poinz stories
 *
 * @param data
 * @return {object[]}
 */

function parseCsvDataUrlToStories(data) {
  try {
    LOGGER.debug('Parsing stories...');
    const b64Data = data.substring(data.lastIndexOf(','));
    const plainData = Buffer.from(b64Data, 'base64').toString();
    const results = (0, _papaparse.parse)(plainData, {
      header: true,
      skipEmptyLines: true
    });

    if (results.errors && results.errors.length > 0 || results.meta.aborted || results.meta.truncated) {
      throw new Error('Got errors from parsing or input got truncated...');
    }

    return results.data.map(issueObjectToStory).filter(story => !!story);
  } catch (err) {
    throw new Error('Could not parse to stories ' + err);
  }
}

function issueObjectToStory(issueObject) {
  const title = getTitleFromIssueObject(issueObject);

  if (!title) {
    return undefined;
  }

  return {
    title,
    description: getDescriptionFromIssueObject(issueObject),
    id: (0, _uuid.v4)(),
    estimations: {},
    createdAt: Date.now()
  };
}

const KEY_PROPERTY_NAMES = ['Issue key', 'Issue', 'issue', 'Key', 'key'];
const TITLE_PROPERTY_NAMES = ['Summary', 'summary', 'Title', 'title'];
const DESCR_PROPERTY_NAMES = ['Description', 'description', 'Descr', 'descr'];

function getTitleFromIssueObject(issueObject) {
  let title = '';
  const keyProp = KEY_PROPERTY_NAMES.find(isPropMatch.bind(issueObject));

  if (keyProp) {
    title += issueObject[keyProp] + ' ';
  }

  const titleProp = TITLE_PROPERTY_NAMES.find(isPropMatch.bind(issueObject));

  if (titleProp) {
    title += issueObject[titleProp];
  }

  return title.trim();
}

function getDescriptionFromIssueObject(issueObject) {
  let description = '';
  const descrProp = DESCR_PROPERTY_NAMES.find(isPropMatch.bind(issueObject));

  if (descrProp) {
    description += issueObject[descrProp];
  }

  return description.trim();
}

function isPropMatch(propertyName) {
  return !!this[propertyName];
}