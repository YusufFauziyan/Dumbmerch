import React, {useContext} from 'react'
import { Container, Navbar as NavbarComp, Nav } from 'react-bootstrap'
import {
    Link,
    useHistory
} from "react-router-dom"

import { UserContext } from '../context/userContext'

import ImgDumbMerch from '../assets/DumbMerch.png'

export default function NavbarAdmin(props) {
    function changeTheme () {
        let elemet = document.body
        elemet.classList.toggle("light-theme")
    }

    const [state, dispatch] = useContext(UserContext)

    let history = useHistory()

    const logout = () => {
        console.log(state)
        dispatch({
            type: "LOGOUT"
        })
        history.push("/auth")
    }

    return (
        <NavbarComp expand="lg" variant='dark'>
            <Container>
                <NavbarComp.Brand as={Link} to="/complain-admin">
                    <img src={ImgDumbMerch} className="img-fluid" style={{ width: '60px', height: '60px' }} alt="brand"/>
                </NavbarComp.Brand>
                <NavbarComp.Toggle aria-controls="basic-navbar-nav" />
                <NavbarComp.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/complain-admin" className={props?.title == 'Complain admin' ? `text-navbar-active` : `text-navbar`}>Complain</Nav.Link>
                        <Nav.Link as={Link} to="/category-admin" className={props?.title == 'Category admin' ? `text-navbar-active` : `text-navbar`}>Category</Nav.Link>
                        <Nav.Link as={Link} to="/product-admin" className={props?.title == 'Product admin' ? `text-navbar-active` : `text-navbar`}>Product</Nav.Link>
                        <Nav.Link onClick={logout} className="text-navbar">Logout</Nav.Link>
                        <Nav.Link><i class='bx bxs-circle-half fs-4 change-theme cursor-pointer' id="theme-button" onClick={changeTheme} ></i></Nav.Link>
                    </Nav>
                </NavbarComp.Collapse>
            </Container>
        </NavbarComp>
    )
}
