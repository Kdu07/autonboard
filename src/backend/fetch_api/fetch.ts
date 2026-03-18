export class LocationHierarquiFetch{
    static async post_customers(name:string, region:string, status:string){
        try {
            const response = await fetch("https://equiem.onrender.com/customers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ 
                    name, 
                    region,
                    status
                })
            });

            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            console.log(` Customer "${name}" created successfully`)
        }
        catch(error){
            console.error('Error:', error)
        }      
    }

    static async post_sites(name:string, adress:string, timezone:string, siteType:string, customerId:string){
        try{
            const result = await fetch("https://equiem.onrender.com/sites", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    adress,
                    timezone,
                    siteType,
                    customerId
                })
            })    

            if(!result.ok){
                throw new Error(`server respondede with status : ${result.status}`)
            }
            console.log(`Site "${name}" created successfully`)
        }
        catch(error){
            console.error(' Error creating site:', error)
        }
    }

    static async post_buildings(name:string, displayOrder:string, siteId:string){
        try{
            const result = await fetch("https://equiem.onrender.com/buildings",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"     
                },
                body: JSON.stringify({
                    name,
                    displayOrder,
                    siteId
                })

            })

            if(!result.ok){
                throw new Error(`server respondede with status : ${result.status}`)
            }
            console.log(` Building "${name}" created successfully`)
        }
        catch(error){
            console.error(' Error creating building:', error)
        }
    }

    static async post_levels(name:string, displayOrder:number, spaceCount:number, buildinId:string){
        try{
            const result = await fetch("https://equiem.onrender.com/levels",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"     
                },
                body: JSON.stringify({
                    name,
                    displayOrder,
                    spaceCount,
                    buildinId
                })
            }
            )
            if(!result.ok){
                throw new Error(`server respondede with status : ${result.status}`)
            }
            console.log(`Level "${name}" created successfully`)
        }
        catch(error){
            console.error('Error creating level:', error);
        }
    }

    static async post_space(name:string, ownershipType:string, leveId:string){
        try{
            const result = await fetch("https://equiem.onrender.com/levels", {
                method: "POST",
                headers: {
                    "Content-Type ": "application/json"
                },
                body: JSON.stringify({
                    name,
                    ownershipType,
                    leveId
                })
            })

            if(!result.ok){
                throw new Error(`server respondede with status : ${result.status}`)
            }
            console.log(`Space "${name}" created successfully`)
        }
        catch(error){
            console.error('Error creating space:', error)
        }
    }
}

