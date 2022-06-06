import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    // document.addEventListener("DOMContentLoaded",function(){
  
    //     var body=document.body;
    //      setInterval(createStar,100);
    //      function createStar(){
    //        var right=Math.random()*500;
    //        var top=Math.random()*window.innerHeight;
    //        var star=document.createElement("div");
    //     star.classList.add("star")
    //      body.appendChild(star);
    //      setInterval(runStar,10);
    //        star.style.top=top+"px";
    //      function runStar(){
    //        if(right>=window.innerWidth){
    //          star.remove();
    //        }
    //        right+=3;
    //        star.style.right=right+"px";
    //      }
    //      } 
    //    })
    return (
        <>
        <div style={{
            height: "100vh",
            backgroundImage: "linear-gradient(to top, #2e1753, #1f1746, #131537, #0d1028, #050819)",
            display:"flex",
            justifyContent:"center",
            alignItems: "center",
            overflow: "hidden",
            textAlign: "center",
            boxSizing: "border-box"
        }}>
            <div class="text" style={{
                position: "absolute",
                top: "10%",
                color: "#fff",
                textalign: "center",
                overflow: "hidden"
            }}>
                <div>ERROR</div>
                <h1 style={{fontSize: "50px"}}>404</h1>
                <hr />
                <div>Page Not Found</div>
                <Link to="/" style={{
                    padding: "10px 20px",
                    marginTop: "30px",
                    display: "inline-block",
                    color: "#0E102A",
                    textDecoration: "none",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    borderRadius: "10px"
                }}>Back To Home Page</Link>
            </div>
            <div class="astronaut">
                <img src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png" alt="" class="src" style={{
                    width: "100px",
                    position: "absolute",
                    top: "55%",
                    animation: "astronautFly 6s infinite linear"
                }} />
            </div>
            
        </div>
        </>
    ) 
}

export default PageNotFound