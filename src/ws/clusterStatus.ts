import type { Status as WSShardStatus } from "discord.js";

/** Status data for a single Discord.js WebSocket shard. */
export type ShardStatusData = {
  /** The shard's ID. */
  id: number;
  /** Round-trip latency to Discord's gateway in milliseconds. `-1` if not yet measured. */
  ping: number;
  /**
   * Discord.js WebSocketShardStatus enum (numeric)
   *
   * @see {WSShardStatus}
   */
  status: WSShardStatus;
};

/** Runtime statistics collected from a single cluster worker via IPC. */
export type ClusterStatusData = {
  /** Number of guilds cached by this cluster. */
  guilds: number;
  /** Total member count across all guilds cached by this cluster. */
  members: number;
  /** Status data for each shard managed by this cluster. */
  shards: ShardStatusData[];
};

export type ClusterStatus = {
  /** The cluster's ID. */
  id: number;
  /** Lifecycle state of the cluster process. */
  status: "starting" | "running" | "stopped";
  /** List of shard IDs managed by this cluster. */
  shardList: number[];
  /** Unix timestamp (ms) of when the cluster process was spawned. */
  createdAt: number;
  /** Number of guilds cached by this cluster. Only present when `status` is `"running"`. */
  guilds?: number;
  /** Total member count across all guilds cached by this cluster. Only present when `status` is `"running"`. */
  members?: number;
  /** Per-shard status data. Only present when `status` is `"running"`. */
  shards?: ShardStatusData[];
};
