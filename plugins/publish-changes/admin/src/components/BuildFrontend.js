import React, { useState } from "react";
import { request } from "strapi-helper-plugin";
import pluginId from "../pluginId";
import Button from "./Button";
import LatestRun from "./LatestRun";

const BuildFrontend = () => {
  const [rerender, setRerender] = useState(0);

  async function startBuild(environment) {
    try {
      await request(`${strapi.backendURL}/${pluginId}/runs/start`, {
        method: "POST",
        body: { environment },
      });
      setRerender(rerender + 1);
      strapi.notification.toggle({
        message: `Build started for ${environment}`,
      });
    } catch (e) {
      strapi.notification.toggle({
        type: "warning",
        message: e.response.payload.error,
      });
    }
  }

  return (
    <div>
      <h1>Build frontend</h1>
      <Button onClick={() => startBuild("production")}>Build Production</Button>
      <Button onClick={() => startBuild("staging")}>Build Staging</Button>
      <LatestRun key={rerender} />
    </div>
  );
};

export default BuildFrontend;
