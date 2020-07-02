import { firestore } from "firebase";

export const getCategoriesFB = (setCategories: any) => {
  let data: any[] = [];
  firestore()
    .collection("categories")
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setCategories(data);
    });
};

export const getDeliveriesFB = (setCategories: any, cityID: string) => {
  let data: any[] = [];
  firestore()
    .collection("deliveries")
    .where("city", "==", cityID)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setCategories(data);
    });
};
