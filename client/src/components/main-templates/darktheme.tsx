import React from "react"

function fetchTemplate(){
    
}

function DarkTheme(){
    return (
        <div className="text-center">
        <img src={`${process.env.NEXT_PUBLIC_SERVER_PATH}/images/darkthemeposter.avif`} />
        <h1>Dark Theme</h1>
        <h1>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</h1>
        </div>
    )
}