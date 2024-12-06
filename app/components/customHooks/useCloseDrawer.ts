
export default function useCloseDrawer(id:string){
    const drawer = document.getElementById(id) as HTMLInputElement;
    if (drawer) drawer.checked = false;
}