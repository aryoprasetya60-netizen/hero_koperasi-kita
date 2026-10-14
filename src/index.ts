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

function parkingLot(capacity: number) {
  setTimeout(() => {
    const cars: Car[] = [];
    const initiateParkingLot: ParkingLot = {
      capacity: capacity,
      remaining: capacity,
      cars: cars,
    };
    console.log(
      "Menginisialisasi tempat parkir dengan kapasitas" + capacity + "selesai",
    );

    //function park
    function park(car: Car): void {
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

        if (initiateParkingLot.remaining === 0) {
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
        initiateParkingLot.remaining--;
      }, 3000);
    }

    //function leave
    function leave(plate: string): void {
      setTimeout(() => {
        if (cars.length === 0) {
          console.log("tempat parkir masih kosong");
          return;
        }

        const car = cars.find((c) => c.plateNumber === plate);
        if (!car) {
          console.log("Mobil dengan plat ini tidak terdaftar ditempat parkir");
          return;
        }

        const index: number = cars.findIndex((c) => c.plateNumber == plate);
        if (index !== -1) {
          cars.splice(index, 1);
        }
        console.log(
          "Mobil dengan plat " + plate + " telah meninggalkan tempat parkir!",
        );
        initiateParkingLot.remaining++;
      }, 1500);
    }

    //function check
    function check(): void {
      console.log("===============================");
      console.log(`Total Kapasitas: ${capacity}`);
      console.log(`Slot Tersedia: ${initiateParkingLot.remaining}`);
      console.log("Mobil terparkir: ");
    }

    return {
      park,
      leave,
      check,
    };
  }, 5000);
}

const parking = parkingLot(3);
