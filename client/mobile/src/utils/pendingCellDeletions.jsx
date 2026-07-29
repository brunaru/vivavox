import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "@caa_pending_cell_deletions";
const GRACE_PERIOD_MS = 24 * 60 * 60 * 1000; // 24h

async function getQueue() {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error("PendingDeletions: falha ao ler fila:", err);
    return [];
  }
}

async function saveQueue(queue) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(queue));
  } catch (err) {
    console.error("PendingDeletions: falha ao salvar fila:", err);
  }
}

export async function scheduleCellDeletion({ cellId, imgUrl }) {
  const queue = await getQueue();
  const filtered = queue.filter((item) => item.cellId !== cellId);
  filtered.push({
    cellId,
    imgUrl: imgUrl || null,
    deleteAt: Date.now() + GRACE_PERIOD_MS,
  });
  await saveQueue(filtered);
}

export async function cancelCellDeletion(cellId) {
  const queue = await getQueue();
  const filtered = queue.filter((item) => item.cellId !== cellId);
  await saveQueue(filtered);
}

export async function getPendingDeletions() {
  return getQueue();
}

export async function processPendingDeletions({ deleteUserCell, deleteImage }) {
  const queue = await getQueue();
  if (queue.length === 0) return;

  const now = Date.now();
  const due = queue.filter((item) => item.deleteAt <= now);
  const remaining = queue.filter((item) => item.deleteAt > now);

  for (const item of due) {
    try {
      if (item.imgUrl) {
        await deleteImage(item.imgUrl);
      }
      await deleteUserCell(item.cellId);
      console.log(`PendingDeletions: célula ${item.cellId} excluída definitivamente.`);
    } catch (err) {
      console.error(`PendingDeletions: falha ao excluir célula ${item.cellId}, tentará novamente depois:`, err);
      remaining.push(item); 
    }
  }

  await saveQueue(remaining);
}