import Api from "../index";

const qs = require('qs');

const createMenu = async (params: any) => {
  const url = `/api/menus`;
  return await Api.post(url, {
    data: params
  });
}

const updateMenu = async (menuId: string ,params: any) => {
  const url = `/api/menus/${menuId}`;
  return await Api.put(url, {
    data: params
  })
}

export default {
  createMenu,
  updateMenu
}
