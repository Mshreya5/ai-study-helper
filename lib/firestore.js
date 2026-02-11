import { collection, addDoc, query, where, orderBy, getDocs, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export async function saveStudyHistory(userId, { originalText, aiResponse, type }) {
  try {
    const newDocument = await addDoc(collection(db, 'studyHistory'), {
      userId,
      originalText,
      aiResponse,
      type,
      createdAt: serverTimestamp()
    });

    return { id: newDocument.id };
  } catch (error) {
    throw error;
  }
}

export async function getStudyHistory(userId) {
  try {
    const historyQuery = query(
      collection(db, 'studyHistory'),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );

    const snapshot = await getDocs(historyQuery);
    const studyItems = [];
    snapshot.forEach((document) => {
      const documentData = document.data();
      const formattedDate = documentData.createdAt && documentData.createdAt.toDate
        ? documentData.createdAt.toDate().toISOString()
        : documentData.createdAt || null;

      studyItems.push({ id: document.id, ...documentData, createdAt: formattedDate });
    });

    return studyItems;
  } catch (error) {
    throw error;
  }
}
