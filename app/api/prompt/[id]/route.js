import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

//GET (to get the prompt)
export async function GET(request, {params}) {
    try {
        await connectToDB();

        const prompt=await Prompt.findById(params.id).populate('creator');

        if(!prompt) 
            return new Response("Prompt not Found!", {status:404});

        return new Response(JSON.stringify(prompt), {status:200});
    } catch (error) {
        return new Response("Failed to fetch the prompts", {status:500});
    }
}

//PATCH (for updation of the prompt)
export async function PATCH(request, {params}){
    const {prompt, tag} = await request.JSON();
    try {
        await connectToDB();

        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt)
            return new Response("Prompt not Found!", {status:404});    
        
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;
        await existingPrompt.save();
        
        return new Response(JSON.stringify(existingPrompt), {status:200});
    } catch (error) {
        return new Response("Failed to update the prompt", {status:500}); 
    }
}

//DELETE (for deleting the prompt)
export async function DELETE(request, {params}){
    const {prompt, tag} = await request.JSON();
    try {
        await connectToDB();

        const reqPrompt= await Prompt.findByIdAndRemove(params.id);
        
        return new Response("Prompt deleted Successfully!", {status:200});        
    } catch (error) {
        return new Response("Failed to delete the prompt", {status:500});  
    }
}