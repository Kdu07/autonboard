export default class TenantsFetch {
    static async postCompany(
        name: string,
        industry: string,
        attributes: string[],
        approvedDomains: string[],
        userApproval: string
    ) {
        try {
            const result = await fetch("https://equiem.onrender.com/companies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    industry,
                    attributes,
                    approvedDomains,
                    userApproval
                })
            });

            if (!result.ok) {
                throw new Error(`Server responded with status: ${result.status}`);
            }
            console.log(`Company "${name}" created successfully`);
        }
        catch (error) {
            console.error('Error creating company:', error);
        }
    }

    static async postApartment(name: string) {
        try {
            const result = await fetch("https://equiem.onrender.com/apartments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name
                })
            });

            if (!result.ok) {
                throw new Error(`Server responded with status: ${result.status}`);
            }
            console.log(`Apartment "${name}" created successfully`);
        }
        catch (error) {
            console.error('Error creating apartment:', error);
        }
    }
}
