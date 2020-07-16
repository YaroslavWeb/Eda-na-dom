import { firestore } from "firebase";
import { IDelivery } from "../interfaces";
import { apisAreAvailable } from "expo";

// Cities
export const getCityFB = async (setCity: any, cityID: string) => {
  let data: {};
  firestore()
    .collection("cities")
    .doc(cityID)
    .get()
    .then((snapshot) => {
      data = { id: snapshot.id, ...snapshot.data() };
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setCity(data);
    });
};

// Categories
export const getCategoriesFB = async (setCategories: any) => {
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

// Deliveries
export const getOnDeliveriesByCityCategoryFB = async (setDeliveries: any, cityID: string, categoryID: string) => {
  firestore()
    .collection('deliveries')
    .where("city", "==", cityID)
    .where('categories', 'array-contains-any', [categoryID])
    .onSnapshot(snapshot => {
      let data: any[] = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      data = data.sort((a, b) => {
        let indexA: number, indexB: number
        indexA = a.place.findIndex((item: any) => item.categoryID === categoryID);
        indexB = b.place.findIndex((item: any) => item.categoryID === categoryID);

        if (a.place[indexA].point < 4 && b.place[indexB].point < 4) {
          // Обе доставки входят в топ 3, сортируем их по месту
          return a.place[indexA].point - b.place[indexB].point
        }
        else if (a.place[indexA].point < 4 && b.place[indexB].point >= 4) {
          return -1
        }
        else if (a.place[indexA].point >= 4 && b.place[indexB].point < 4) {
          return 1
        }
        else {
          // Обе доставки не топ 3, соритруем по весу.
          const coefficient = (point: number) => {
            if(point <= 1) return 0.2 * Number(point)
            if(point <= 2) return 0.4 * Number(point)
            if(point <= 3) return 0.6 * Number(point)
            if(point <= 4) return 0.8 * Number(point)
            return point
          }
          const w1 = Number(a.rating.votes) * coefficient(a.rating.points)
          const w2 = Number(b.rating.votes) * coefficient(b.rating.points)
          return w2 - w1
        }
      })
      setDeliveries(data)
    }
    )
}

export const getDeliveryFB = async (deliveryID: string) => {
  return firestore()
    .collection('deliveries')
    .doc(deliveryID)
    .get()
    .then((snapshot) => {
      return ({ id: snapshot.id, ...snapshot.data() })
    })
}

export const setRating = async (setDelivery: any, delivery: IDelivery, userRating: number) => {
  let newRating = (delivery.rating.points * delivery.rating.votes + userRating) / (delivery.rating.votes + 1)
  firestore()
    .collection('deliveries')
    .doc(delivery.id)
    .update({ ...delivery, rating: { points: newRating, votes: delivery.rating.votes + 1 } })
    .then(() => {
      firestore()
        .collection('deliveries')
        .doc(delivery.id)
        .get()
        .then((snapshot) => {
          setDelivery({ id: snapshot.id, ...snapshot.data() })
        })
    })
}