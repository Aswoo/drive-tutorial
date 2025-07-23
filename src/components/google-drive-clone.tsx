"use client";

import { useState } from "react";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  File,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  Upload,
  Search,
  Grid3X3,
  List,
  Settings,
  Trash2,
  Star,
  Clock,
  Users,
  HardDrive,
} from "lucide-react";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";

import mockData from "../lib/mock";
import type {
  FileItemData,
  FolderItemData,
  FileType,
} from "~/types/file-system";

// 아이콘 반환 함수
function getFileIcon(fileType: FileType) {
  switch (fileType) {
    case "image":
      return <FileImage className="h-4 w-4 text-green-600" />;
    case "video":
      return <FileVideo className="h-4 w-4 text-red-600" />;
    case "audio":
      return <FileAudio className="h-4 w-4 text-purple-600" />;
    case "document":
      return <FileText className="h-4 w-4 text-blue-600" />;
    default:
      return <File className="h-4 w-4 text-gray-600" />;
  }
}

// 파일 항목 렌더링
function FileItem({ item }: { item: FileItemData }) {
  return (
    <Card className="cursor-pointer p-3 transition-colors hover:bg-gray-50">
      <div className="flex items-center gap-3">
        {getFileIcon(item.fileType)}
        <div className="min-w-0 flex-1">
          <a
            href={`#file-${item.id}`}
            className="block truncate text-sm font-medium text-gray-900 hover:text-blue-600"
          >
            {item.name}
          </a>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-xs text-gray-500">{item.size}</span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs text-gray-500">{item.modified}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}

// 폴더 항목 렌더링
function FolderItem({
  folder,
  openFolders,
  toggleFolder,
}: {
  folder: FolderItemData;
  openFolders: Set<string>;
  toggleFolder: (id: string) => void;
}) {
  const isOpen = openFolders.has(folder.id);

  return (
    <div>
      <Card className="cursor-pointer p-3 transition-colors hover:bg-gray-50">
        <div
          className="flex items-center gap-3"
          onClick={() => toggleFolder(folder.id)}
        >
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-gray-500" />
          ) : (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
          <Folder className="h-4 w-4 text-yellow-600" />
          <span className="flex-1 text-sm font-medium text-gray-900">
            {folder.name}
          </span>
          <Badge variant="secondary" className="text-xs">
            {folder.children?.length || 0} items
          </Badge>
        </div>
      </Card>

      {isOpen && folder.children && (
        <div className="mt-2 ml-6 space-y-2">
          {folder.children.map((child) =>
            child.type === "folder" ? (
              <FolderItem
                key={child.id}
                folder={child}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
              />
            ) : (
              <FileItem key={child.id} item={child} />
            ),
          )}
        </div>
      )}
    </div>
  );
}

// 메인 컴포넌트
export default function GoogleDriveClone() {
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const toggleFolder = (folderId: string) => {
    const newOpenFolders = new Set(openFolders);
    if (newOpenFolders.has(folderId)) {
      newOpenFolders.delete(folderId);
    } else {
      newOpenFolders.add(folderId);
    }
    setOpenFolders(newOpenFolders);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                <HardDrive className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-gray-900">Drive</h1>
            </div>

            <div className="max-w-2xl flex-1">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search in Drive"
                  className="border-gray-200 bg-gray-50 pl-10"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="min-h-screen w-64 border-r border-gray-200 bg-gray-50">
          <div className="p-4">
            <Button className="mb-4 w-full bg-blue-600 hover:bg-blue-700">
              <Upload className="mr-2 h-4 w-4" />
              New
            </Button>

            <nav className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start bg-blue-50 text-blue-700"
              >
                <HardDrive className="mr-3 h-4 w-4" />
                My Drive
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="mr-3 h-4 w-4" />
                Shared with me
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Clock className="mr-3 h-4 w-4" />
                Recent
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="mr-3 h-4 w-4" />
                Starred
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Trash2 className="mr-3 h-4 w-4" />
                Trash
              </Button>
            </nav>

            <div className="mt-6 border-t border-gray-200 pt-4">
              <div className="mb-2 text-xs text-gray-500">Storage</div>
              <div className="mb-2 h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: "45%" }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">4.5 GB of 15 GB used</div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">My Drive</h2>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            {mockData.folders.map((folder) => (
              <FolderItem
                key={folder.id}
                folder={folder}
                openFolders={openFolders}
                toggleFolder={toggleFolder}
              />
            ))}
          </div>

          {/* Quick Access Files */}
          <div className="mt-8">
            <h3 className="mb-4 text-lg font-medium text-gray-900">
              Quick Access
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              <FileItem
                item={{
                  id: "quick-1",
                  type: "file",
                  name: "Important Document.pdf",
                  fileType: "document",
                  size: "1.2 MB",
                  modified: "Today",
                }}
              />
              <FileItem
                item={{
                  id: "quick-2",
                  type: "file",
                  name: "Team Photo.jpg",
                  fileType: "image",
                  size: "2.8 MB",
                  modified: "Yesterday",
                }}
              />
              <FileItem
                item={{
                  id: "quick-3",
                  type: "file",
                  name: "Project Video.mp4",
                  fileType: "video",
                  size: "15.4 MB",
                  modified: "3 days ago",
                }}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
