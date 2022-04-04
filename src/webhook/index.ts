import express, { Application } from "express";
import portfinder from "portfinder";
import eventemitter3 from "eventemitter3";

import { BililiveRecEvent, BililiveRecEventMap } from "./types";
import { env, SeparatedPromise } from "../utils";
import path from "path";
import { Server } from "http";

export interface WebhookOptions {
  host?: string;
  port?: number;
  pathPrefix?: string;
}

export type WebhookEventMap = BililiveRecEventMap & {
  all: BililiveRecEvent;
};

export class Webhook extends eventemitter3<{
  [k in keyof WebhookEventMap]: [event: WebhookEventMap[k], instanceId: string];
}> {
  private constructor(
    public host: string,
    public port: number,
    public pathPrefix: string,
    public app: Application,
    public server: Server
  ) {
    super();

    app.post<{ instanceId: string }, string, BililiveRecEvent>(
      `/${pathPrefix}/:instanceId`,
      async (req, res) => {
        const instanceId = req.params.instanceId;
        const body = req.body;

        this.emit("all", body, instanceId);
        const emitParams = [body.EventType, body, instanceId] as [
          k: keyof WebhookEventMap,
          event: WebhookEventMap[keyof WebhookEventMap],
          instanceId: string
        ];
        this.emit(...emitParams);
        res.sendStatus(200);
      }
    );
  }
  static async create(opts?: WebhookOptions): Promise<Webhook> {
    const host = opts?.host ?? env("WEBHOOK_HOST") ?? "localhost";
    const pathPrefix =
      opts?.pathPrefix ?? env("WEBHOOK_PATH_PREFIX") ?? "webhook";
    const port =
      opts?.port ??
      env("WEBHOOK_POST", "int") ??
      (await portfinder.getPortPromise({ host: host, port: 9000 }));

    const waitServerUp = new SeparatedPromise<void>();
    const app = express();
    const server = app.listen(port, host, () => waitServerUp.resolve());
    await waitServerUp;
    return new Webhook(host, port, pathPrefix, app, server);
  }
  stop(): Promise<void> {
    return new Promise((r, rj) => this.server.close((e) => (e ? rj(e) : r())));
  }
  getUrl(instanceId = "default") {
    if (instanceId.includes("/")) throw "instanceId invalid";
    const url = new URL(`http://${this.host}:${this.port}`);
    url.pathname = path.posix.join("/", this.pathPrefix, instanceId);
    return url.toString();
  }
}