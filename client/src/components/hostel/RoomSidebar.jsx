'use client'

import React, { ReactNode, useEffect } from 'react'
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const LinkItems = [
  { name: 'Hostel Home',link:"/hostel", icon: FiHome },
  // { name: 'Rooms',link:"/hostel/hostel/", icon: FiTrendingUp },
  // { name: 'Bookings',link:"/hostel/bookings", icon: FiCompass },

]

export default function Sidebar({hostelId}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {hostelSidebarOpen} = useSelector((state)=>state.common)
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!sessionStorage.getItem('adminSideSelected')){
      sessionStorage.setItem('adminSideSelected','Home')
    }
  },[hostelSidebarOpen])
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
        {/* <Button onClick={onOpen}>Open Drawer</Button> */}
      <SidebarContent onClose={ ()=>dispatch({type:'TOGGLE-HOSTEL-SIDEBAR'})} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={hostelSidebarOpen}
        placement="left"
        onClose={()=>dispatch({type:'TOGGLE-HOSTEL-SIDEBAR'})}
        returnFocusOnClose={false}
        onOverlayClick={()=>dispatch({type:'TOGGLE-HOSTEL-SIDEBAR'})}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={()=>dispatch({type:'TOGGLE-HOSTEL-SIDEBAR'})} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box ml={{ base: 0, md: 60 }} p="4">
        {/* Content */}
      </Box>
    </Box>
  )
}

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentLocation = window.location.pathname;
  return (
    <Box
      bg={'white'}
      // borderRight="1px"
      // borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      // w={{ base: 'full', md: 60 }}
      style={{width: "270px", marginTop:"0px"}}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="12" justifyContent="space-between">
        <CloseButton style={{marginLeft:"-38px", marginTop:"-10px"}} display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        <h4 className="brand-name side d-flex ms-1">HostelWeb</h4>
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {/* Logo */}
        </Text>
      </Flex>
      {LinkItems.map((item) => (
        <NavItem key={item.name} onClick={()=>{
          dispatch({type:"SET-SEARCH-QUERY",payload:""})
          sessionStorage.setItem('adminSideSelected',item.name)
          navigate(item.link)
        }} _hover={{ backgroundColor: '#efefef' }} 
        backgroundColor={currentLocation===item.linke ? "#3B71CA" :"transparent"}
        color={currentLocation===item.link ? "white" :"black"}
        style={{transition:".2s"}}
         icon={item.icon}>
          {item.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Box>
  )
}


const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  )
}