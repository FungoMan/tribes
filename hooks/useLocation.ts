import { locations } from "constant";
import { useEffect, useState } from "react";

const useLocation = () => {
  fetch("https://www.cloudflare.com/cdn-cgi/trace")
    .then((response) => response.text())
    .then((two) => {
      if (!two.trim()) {
        return;
      }
      let data = two.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
      data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
      var userLocation = JSON.parse(data).loc?.toLowerCase();
      const browserLocale =
        locations.find((country) => country.code === userLocation) ||
        locations[0];
    });
};

export default useLocation;
