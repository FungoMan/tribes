import Api from "../index";
import {AuthEmailPayload} from "../../types/auth";

const qs = require('qs');

const createBizInvoice = async (params: any) => {
  const url = `/api/biz-invoices`;
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  return await Api.post(url, {
    data: {
        user: userInfo.id,
        value: params.value,
        payment_method: params.paymentMethod,
        transaction_id: params.transaction_id,
        biz_listing: userInfo.biz_id,
    }
  });
}

const createBizRevisionInvoice = async (params: any) => {
  const url = `/api/biz-invoices`;
  let userInfo = JSON.parse(localStorage.getItem("user") || '{}')
  return await Api.post(url, {
    data: {
        user: userInfo.id,
        value: params.value,
        payment_method: params.paymentMethod,
        transaction_id: params.transaction_id,
        biz_listing_revision: userInfo.biz_id,
    }
  });
}


const getBizInvoiceByUserId = async (userId: number) => {
  const query = qs.stringify({
    "filters": {
      "user": {
        "id": {
          "$eq": userId
        }
      }    
    },
    "populate": "*"
  }, {
    encodeValuesOnly: true, 
  });

  const url = `/api/biz-invoices?${query}`;
  return await Api.get(url);
}

export default {
    createBizInvoice,
    createBizRevisionInvoice,
    getBizInvoiceByUserId
}
