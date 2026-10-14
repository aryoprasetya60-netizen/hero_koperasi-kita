class Car {
  constructor(
    public plateNumber: string,
    public owner: string,
  ) {}
}

interface ParkingLot {
  capacity: number; // Kapasitas tempat parkir
  remaining: number; // Sisa tempat parkir yang masih kosong
  cars: Car[]; // Array dari object Car.
}

const car1: Car = new Car("B001", "Aryo");
const car2: Car = new Car("B002", "Baryo");
const car3: Car = new Car("B003", "Caryo");
const car4: Car = new Car("B004", "Daryo");
const car5: Car = new Car("B005", "Eryo");

async function parkingLot(capacity: number): Promise<{
  park: (car: Car) => Promise<void>;
  leave: (plate: string) => Promise<void>;
  check: () => Promise<void>;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(
        "Menginisialisasi tempat parkir dengan kapasitas " +
          capacity +
          " selesai",
      );
      const cars: Car[] = [];
      const parking: ParkingLot = {
        capacity: capacity,
        remaining: capacity,
        cars: cars,
      };

      //function park
      function park(car: Car): Promise<void> {
        return new Promise((resolve) => {
          setTimeout(() => {
            let checkPlate = false;
            cars.forEach((c) => {
              if (c.plateNumber === car.plateNumber) {
                console.log("Mobil ini sudah terparkir!");
                checkPlate = true;
                return;
              }
            });
            if (checkPlate) {
              return;
            }

            if (parking.remaining === 0) {
              console.log("Tempat Parkir Sudah Penuh");
              return;
            }

            const newCar: Car = new Car(car.owner, car.plateNumber);
            cars.push(newCar);

            console.log(
              "Mobil dengan plat " +
                newCar.plateNumber +
                " berhasil didaftarkan ke tempat parkir",
            );
            parking.remaining--;
            resolve();
          }, 3000);
        });
      }

      //function leave
      function leave(plate: string): Promise<void> {
        return new Promise((resolve) => {
          setTimeout(() => {
            if (cars.length === 0) {
              console.log("tempat parkir masih kosong");
              return;
            }

            const car = cars.find((c) => c.plateNumber === plate);
            if (!car) {
              console.log(
                "Mobil dengan plat ini tidak terdaftar ditempat parkir",
              );
              return;
            }

            const index: number = cars.findIndex((c) => c.plateNumber == plate);
            if (index !== -1) {
              cars.splice(index, 1);
            }
            console.log(
              "Mobil dengan plat " +
                plate +
                " telah meninggalkan tempat parkir!",
            );
            parking.remaining++;
            resolve();
          }, 1500);
        });
      }

      //function check
      function check(): Promise<void> {
        return new Promise((resolve) => {
          setTimeout(() => {
            console.log("===============================");
            console.log(`Total Kapasitas: ${capacity}`);
            console.log(`Slot Tersedia: ${parking.remaining}`);
            if (cars.length === 0) {
              console.log("Tidak ada mobil yang terparkir sekarang ");
            } else {
              console.log("Mobil Terparkir:");
              cars.forEach((c) => {
                console.log("Nomor Polisi :" + c.plateNumber);
                console.log("Nama Pemilik :" + c.owner);
              });
            }
            resolve();
          }, 500);
        });
      }
      resolve({ park, leave, check });
    }, 5000);
  });
}

async function main() {
  const parking = await parkingLot(3);

  await parking.park(car1);
  await parking.check();

  await parking.park(car2);
  await parking.leave("B001");

  await parking.park(car3);
  await parking.park(car4);

  await parking.leave("B009");

  await parking.park(car5);
  await parking.park(car1);

  await parking.leave("B001");
  await parking.check();

  await parking.leave("B004");
  await parking.check();
}

main();
