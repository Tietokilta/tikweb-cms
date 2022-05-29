import React, { useState, useEffect } from "react";
import { request } from "strapi-helper-plugin";
import pluginId from "../pluginId";

const LatestRun = () => {
  const [latestRun, setLatestRun] = useState({});

  useEffect(() => {
    request(`${strapi.backendURL}/${pluginId}/runs/latest`)
      .then((res) => setLatestRun(res))
      .catch((e) =>
        strapi.notification.toggle({
          type: "warning",
          message: e.response.payload.error,
        })
      );
  }, []);

  return (
    <div>
      <h2>Latest run created from here</h2>
      <p>Created at: {latestRun.run_started_at}</p>
      <p>Status: {latestRun.status}</p>
      <a href={latestRun.html_url}>URL</a>
    </div>
  );
};

export default LatestRun;
