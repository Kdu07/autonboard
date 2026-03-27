export default class BookingsFetch {
    static async postBookableResource(
        name: string,
        description: string,
        capacity: number,
        location: string,
        status: string,
        photos: string[],
        buildingId: string
    ) {
        try {
            const result = await fetch("https://equiem.onrender.com/bookable-resources", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    description,
                    capacity,
                    location,
                    status,
                    photos,
                    buildingId
                })
            });

            if (!result.ok) {
                throw new Error(`Server responded with status: ${result.status}`);
            }
            console.log(`Bookable Resource "${name}" created successfully`);
        }
        catch (error) {
            console.error('Error creating bookable resource:', error);
        }
    }

    static async postBooking(
        startTime: string,
        endTime: string,
        status: string,
        notes: string,
        userId: string,
        bookableResourceId: string
    ) {
        try {
            const result = await fetch("https://equiem.onrender.com/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    startTime,
                    endTime,
                    status,
                    notes,
                    userId,
                    bookableResourceId
                })
            });

            if (!result.ok) {
                throw new Error(`Server responded with status: ${result.status}`);
            }
            console.log(`Booking created successfully`);
        }
        catch (error) {
            console.error('Error creating booking:', error);
        }
    }
}
