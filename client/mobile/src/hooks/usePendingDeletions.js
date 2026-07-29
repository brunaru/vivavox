import { useEffect, useRef } from "react";
import { AppState } from "react-native";
import api from "../services/api";
import { processPendingDeletions } from "../utils/pendingCellDeletions";

const CHECK_INTERVAL_MS = 60 * 60 * 1000; 

async function deleteUserCell(cellId) {
  await api.delete(`/userCell/delete/${cellId}`);
}

async function deleteImage(imgUrl) {
  await api.delete("/cell/deleteImage", { data: { imageUrl: imgUrl } });
}

export function usePendingDeletionsProcessor() {
  const intervalRef = useRef(null);

  useEffect(() => {
    function run() {
      processPendingDeletions({ deleteUserCell, deleteImage });
    }

    run(); 
    intervalRef.current = setInterval(run, CHECK_INTERVAL_MS);

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") run(); 
    });

    return () => {
      clearInterval(intervalRef.current);
      subscription.remove();
    };
  }, []);
}