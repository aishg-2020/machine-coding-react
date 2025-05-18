import { useState, useRef } from "react";
import { fileFolderDummyData } from "./data";

function SingleFileFolder({
  id,
  name,
  level,
  isFolder,
  handleExpansion,
  isExpanded,
  handleAddFileFolder,
}) {
  const handleAddFile = () => {
    const filename = prompt("Enter Filename");
    const fileObj = {
      id: Math.random() * 1000,
      name: filename,
    };
    handleAddFileFolder(id, fileObj);
  };

  const handleAddFolder = () => {
    const folderName = prompt("Enter Filename");
    const folderObj = {
      id: Math.random() * 1000,
      name: folderName,
      isFolder: true,
      isExpanded: true,
      children: [],
    };
    handleAddFileFolder(id, folderObj);
  };

  return (
    <div
      key={id}
      style={{
        marginLeft: `${level * 10}px`,
        display: "flex",
      }}
    >
      <div
        className={`${isFolder ? "folder" : "file"}`}
        onClick={() => {
          isFolder && handleExpansion(id, !isExpanded);
        }}
      >
        {name} {`${!isFolder ? "" : isExpanded ? "[-]" : "[+]"}`}
      </div>
      {isFolder && (
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          <div>
            <img
              width={16}
              style={{ cursor: "pointer" }}
              src="https://cdn1.iconfinder.com/data/icons/line-free/24/Add_file_symbol-512.png"
              onClick={handleAddFile}
            />
          </div>
          <div>
            <img
              width={20}
              style={{ cursor: "pointer" }}
              src="https://cdn1.iconfinder.com/data/icons/document-edit-line/64/Document-doc-file-folder-bundle-add-new-512.png"
              onClick={handleAddFolder}
            />
          </div>
        </div>
      )}
    </div>
  );
}
function AllFolders({
  fileFolderData,
  level,
  handleExpansion,
  handleAddFileFolder,
}) {
  return (
    <div key={`fileFolderData${level}`} className="fileFolderList">
      {fileFolderData.map((single) => {
        const { name, id, isFolder, children, isExpanded } = single;
        if (isFolder && children.length > 0)
          return (
            <div>
              <SingleFileFolder
                key={`${id}folder`}
                id={id}
                name={name}
                level={level}
                isFolder={isFolder}
                handleExpansion={handleExpansion}
                isExpanded={isExpanded}
                handleAddFileFolder={handleAddFileFolder}
              />
              {isExpanded && (
                <AllFolders
                  fileFolderData={children}
                  key={`${id}AllFolders`}
                  level={level + 1}
                  handleExpansion={handleExpansion}
                  handleAddFileFolder={handleAddFileFolder}
                />
              )}
            </div>
          );
        else
          return (
            <SingleFileFolder
              key={`${id}file`}
              id={id}
              name={name}
              level={level}
              isFolder={isFolder}
              isExpanded={isExpanded}
              handleExpansion={handleExpansion}
              handleAddFileFolder={handleAddFileFolder}
            />
          );
      })}
    </div>
  );
}
export default function FileExplorer() {
  const [fileFolderData, setFileFolderData] = useState(fileFolderDummyData);

  const handleExpansion = (id, isExpanded) => {
    const updatedState = [...fileFolderData];
    const handleUpdateState = (id, isExpanded, data) => {
      data?.forEach((item) => {
        if (item.id === id && item.isFolder) {
          item.isExpanded = isExpanded;
        } else {
          const children = item.children;
          if (children?.length > 0) {
            handleUpdateState(id, isExpanded, children);
          }
        }
      });
    };
    handleUpdateState(id, isExpanded, updatedState);
    setFileFolderData(updatedState);
  };
  const handleAddFileFolder = (parentId, obj) => {
    const updatedState = [...fileFolderData];
    const handleUpdateState = (parentId, obj, data) => {
      data?.forEach((item) => {
        if (item.id === parentId) {
          item.children = [...item.children, obj];
        } else {
          const children = item.children;
          if (children?.length > 0) {
            handleUpdateState(parentId, obj, children);
          }
        }
      });
    };
    handleUpdateState(parentId, obj, updatedState);
    setFileFolderData(updatedState);
  };

  return (
    <div>
      <AllFolders
        fileFolderData={fileFolderData}
        level={0}
        handleExpansion={handleExpansion}
        handleAddFileFolder={handleAddFileFolder}
      />
    </div>
  );
}
