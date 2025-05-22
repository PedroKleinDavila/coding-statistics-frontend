import { Flex, useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import SideBar from '../components/stats/sideBar'
import StatsContent from '../components/stats'
import { getUserInfo } from '../service/getUserInfo'
import type { UserInfo } from '../types'

function Stats() {
    const { email } = useParams()
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const [page, setPage] = useState("Overall")
    const toast = useToast();
    useEffect(() => {
        const getData = async () => {
            const userInfo = await getUserInfo(email ?? '')
            if (!userInfo) {
                toast({
                    title: "Error",
                    description: "User not found",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                })
                return
            }
            setUserInfo(userInfo)

        }
        getData()
    }, [email, toast])
    return (
        <Flex h="100vh" w="100vw" alignItems="center" justifyContent="center" bg="#0D0D0D" color="white">
            {userInfo &&
                <>
                    <SideBar email={email ?? ''} pageFunction={(page) => { setPage(page) }} />
                    <StatsContent page={page} userInfo={userInfo} />
                </>
            }
        </Flex>
    )
}

export default Stats
