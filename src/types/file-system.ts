export type FileType = "document" | "image" | "video" | "audio";

export type BaseItem = {
  id: string;
  name: string;
  type: "file" | "folder";
};

export type FileItemData = BaseItem & {
  type: "file";
  fileType: FileType;
  size: string;
  modified: string;
};

export type FolderItemData = BaseItem & {
  type: "folder";
  children: Array<FileItemData | FolderItemData>;
};
