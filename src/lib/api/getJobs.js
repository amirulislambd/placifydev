const baseUrl =process.env.NEXT_PUBLIC_BASE_URL
export const  getJobs =async()=>{
    const res = await fetch(`${baseUrl}/api/jobs`)
    return res.json()
}