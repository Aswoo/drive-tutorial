import type { FolderItemData } from "~/types/file-system";

const mockData: { folders: FolderItemData[] } = {
  folders: [
    {
      id: "1",
      name: "Documents",
      type: "folder",
      children: [
        {
          id: "1-1",
          name: "Work Projects",
          type: "folder",
          children: [
            {
              id: "1-1-1",
              name: "Project Proposal.docx",
              type: "file",
              fileType: "document",
              size: "2.4 MB",
              modified: "2 days ago",
            },
            {
              id: "1-1-2",
              name: "Budget Analysis.xlsx",
              type: "file",
              fileType: "document",
              size: "1.8 MB",
              modified: "1 week ago",
            },
          ],
        },
        {
          id: "1-2",
          name: "Resume.pdf",
          type: "file",
          fileType: "document",
          size: "245 KB",
          modified: "3 days ago",
        },
        {
          id: "1-3",
          name: "Meeting Notes.txt",
          type: "file",
          fileType: "document",
          size: "12 KB",
          modified: "1 day ago",
        },
      ],
    },
    {
      id: "2",
      name: "Photos",
      type: "folder",
      children: [
        {
          id: "2-1",
          name: "Vacation 2024",
          type: "folder",
          children: [
            {
              id: "2-1-1",
              name: "beach-sunset.jpg",
              type: "file",
              fileType: "image",
              size: "3.2 MB",
              modified: "1 month ago",
            },
            {
              id: "2-1-2",
              name: "mountain-hike.jpg",
              type: "file",
              fileType: "image",
              size: "2.8 MB",
              modified: "1 month ago",
            },
          ],
        },
        {
          id: "2-2",
          name: "profile-photo.png",
          type: "file",
          fileType: "image",
          size: "1.1 MB",
          modified: "2 weeks ago",
        },
      ],
    },
    {
      id: "3",
      name: "Videos",
      type: "folder",
      children: [
        {
          id: "3-1",
          name: "presentation-demo.mp4",
          type: "file",
          fileType: "video",
          size: "45.2 MB",
          modified: "5 days ago",
        },
        {
          id: "3-2",
          name: "tutorial-recording.mov",
          type: "file",
          fileType: "video",
          size: "128 MB",
          modified: "1 week ago",
        },
      ],
    },
  ],
};

export default mockData;
