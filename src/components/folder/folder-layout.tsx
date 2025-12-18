import { FolderLayoutProps } from "@/types";
import FolderHeader from "./folder-header";
import DocumentViewer from "./document-viewer";
import FolderContent from "./folder-content";

export default function FolderLayout({ folder, children }: FolderLayoutProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 w-full min-w-0">
      <FolderHeader folder={folder} />

      {folder.isDocument && folder.documentPath && folder.documentType ? (
        <DocumentViewer
          folderName={folder.name}
          icon={folder.image}
          documentType={folder.documentType}
          documentPath={folder.documentPath}
        />
      ) : (
        <FolderContent folder={folder}>
          {children}
        </FolderContent>
      )}
    </div>
  );
}

