import ToHomePageButton from "@/app/components/button/ToHomePageButton";

export default function NoProductPage(){
    return(
        <div className=" flex flex-col items-center justify-center">
            <p>There's no product yet</p>
            <ToHomePageButton/>
        </div>
    )
}