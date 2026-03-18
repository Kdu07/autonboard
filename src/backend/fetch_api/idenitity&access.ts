export default class Identity_Access{
    static async postUser(firstName:string, lastName:string, email:string, emailVerified:boolean,
        mobileNumber:string, status:string, userType: string, uuid:string,
        auth0Id:string, memberSince:Date){
            try{
                const result = await fetch("",{
                    method:"POST",
                    headers:{
                        "Content-Type ": "application/json"
                    },
                    body: JSON.stringify({
                        firstName, lastName, email, emailVerified,
                        mobileNumber, status, userType, uuid, auth0Id, memberSince
                    })
                })

                if(!result.ok){
                    throw new Error(`System responded with status : ${result.status}`)
                }
                console.log(`User "${firstName} ${lastName}" created successfully`)
            }
            catch(error){
                console.error('Error creating user:', error)
            }
    }

    static async postSiteProfile(status:string, isActive:boolean,userId:string,
        siteId:string, companyId:string){
            try{
                const result = await fetch("", {
                    method:"POST",
                    headers:{
                        "Content-Type ": "application/json"
                    },
                    body: JSON.stringify({
                        status, isActive, userId, siteId, companyId
                    })
                })
                if(!result.ok){
                    throw new Error(`System responded with status : ${result.status}`)
                }
                console.log(`Site Profile created successfully`)
            }
            catch(error){
                console.error('Error creating site profile:', error);
            }
    }

    static async postRoles(name:string, description:string, scopeLevel:string, permissions:string[]){
        try{
            const result = await fetch("https://equiem.onrender.com/roles", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name, description, scopeLevel, permissions
                })
            })
            if(!result.ok){
                throw new Error(`System responded with status : ${result.status}`)
            }
            console.log(`Role "${name}" created successfully`)
        }
        catch(error){
            console.error('Error creating role:', error)
        }
    }

    static async postGroups(name:string){
        try{
            const result = await fetch("https://equiem.onrender.com/groups", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name
                })
            })
            if(!result.ok){
                throw new Error(`System responded with status : ${result.status}`)
            }
            console.log(`Group "${name}" created successfully`)
        }
        catch(error){
            console.error('Error creating group:', error)
        }
    }

    static async postInterest(name:string){
        try{
            const result = await fetch("https://equiem.onrender.com/interest", {
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name
                })
            })
            if(!result.ok){
                throw new Error(`System responded with status : ${result.status}`)
            }
            console.log(`Interest "${name}" created successfully`)
        }
        catch(error){
            console.error('Error creating interest:', error)
        }
    }
}