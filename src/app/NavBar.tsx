"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function NavBar() {
    const pathname = usePathname();

    return (
        <Navbar bg="dark" data-bs-theme="dark" sticky="top" expand="sm" collapseOnSelect>
            <Container>
                <Navbar.Brand as={Link} href="/">
                    Next 14.2 Img Gallary
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        <Nav.Link as={Link} href="/Static" active={pathname === "/Static"}>Static</Nav.Link>
                        <Nav.Link as={Link} href="/Dynamic" active={pathname === "/Dynamic"}>Dynamic</Nav.Link>
                        <Nav.Link as={Link} href="/ISR" active={pathname === "/ISR"}>ISR</Nav.Link>
                        <NavDropdown title="Topics" id="topics-dropdown">
                            <NavDropdown.Item as={Link} href="/Topics/Islam" active={pathname === "/Topics/Islam"}>Islam</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/Topics/Weightlifting" active={pathname === "/Topics/Weightlifting"}>Weightlifting</NavDropdown.Item>
                            <NavDropdown.Item as={Link} href="/Topics/Coding" active={pathname === "/Topics/Coding"}>Coding</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} href="/Search" active={pathname === "/Search"}>Search</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}