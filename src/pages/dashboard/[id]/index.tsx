import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";
import { useRouter } from "next/router";
import { ReactElement, useEffect } from "react";
import Layout from "@/components/dashboard/Layout";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  LinkBox,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorModeValue,
  useStyleConfig,
  useToast,
} from "@chakra-ui/react";
import { MediaRenderer } from "@thirdweb-dev/react";
import Link from "next/link";



export default function Detail() {
    const disconnectWallet = useDisconnect();
    const router = useRouter();
    const address = useAddress();
    useEffect(() => {
        !address ? router.push(`/dashboard`) : null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [address]);
  return (
    <div>
        
    </div>
  )
}

Detail.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

