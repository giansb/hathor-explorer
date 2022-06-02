/**
 * Copyright (c) Hathor Labs and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import requestExplorerServiceV1 from './axiosInstance';
import { get } from 'lodash';

const handleResponse = (response) => {
  // If status is not retrieved, we assume an internal error ocurred, giving the status code 500
  // Currently 200 is always returned for success responses
  if (get(response, 'status', 500) !== 200) {
    return {
      'error': true,
    };
  }

  return {
    ...response,
    error: false,
  };
};

const tokensApi = {
  /**
   * Downloads a list of tokens that match the searched text
   *
   * @param {String} searchText The text to match against the token values
   * @param {String} sortBy field to sort by, possible values are (name, symbol, uid)
   * @param {String} order Order to sort the fields, possible values are ('desc', 'asc')
   * @param {Array[String]} searchAfter Search after this result, this should use the sort attribute of
   * the returned hit
   *
   * @return {Promise}
   */
  async getList(searchText, sortBy, order, searchAfter) {
    const data = {
      'search_text': searchText,
      'sort_by': sortBy,
      'order': order,
      'search_after': searchAfter.join(','),
    };

    const response = await requestExplorerServiceV1.get('tokens', { params: data });

    return handleResponse(response);
  },

  /**
   * Downloads a list of token balances given an token_id
   *
   * @param {String} tokenId Token id to filter token address balances
   * @param {String} sortBy field to sort by, possible values are (total, unlocked_balance, locked_balance)
   * @param {String} order Order to sort the fields, possible values are ('desc', 'asc')
   * @param {Array[String]} searchAfter Search after this result, this should use the sort attribute of
   * the returned hit
   *
   * @return {Promise}
   */
  async getBalances(tokenId, sortBy, order, searchAfter) {
    const data = {
      'token_id': tokenId,
      'sort_by': sortBy,
      'order': order,
      'search_after': searchAfter.join(',')
    };

    const response = await requestExplorerServiceV1.get('token_balances', { params: data });

    return handleResponse(response);
  },

  /**
   * Downloads address count and transaction count information for a given token_id
   *
   * @param {String} tokenId Token id to filter token address balance information
   *
   * @return {Promise}
   */
  async getBalanceInformation(tokenId) {
    const data = {
      'token_id': tokenId,
    };

    const response = await requestExplorerServiceV1.get('token_balances/information', { params: data });

    return handleResponse(response);
  },
};

export default tokensApi;
