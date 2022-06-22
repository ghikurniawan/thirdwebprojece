import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '@/components/homepage/Layout';
import { HomepageSection } from '@/components/homepage/Section';
import {
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

export default function Home(){
  return (
    <div>
      <NextSeo 
        title='Home'
      />
      <HomepageSection id="home" topGradient bottomPattern >
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={800}
          fontSize={{ base: '3xl', sm: '4xl', md: '8xl' }}
          lineHeight={'110%'}>
          More air{' '}
          <Text as={'span'} color={'green.400'}>
            More Power
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Never miss a meeting. Never be late for one too. Keep track of your
          meetings and receive smart reminders in appropriate times. Read your
          smart “Daily Agenda” every morning.
        </Text>
        <Stack spacing={6} direction={'row'}>
        <Link as="/dashboard" href="/dashboard">
          <Button
            rounded={'lg'}
            size={'lg'}
            px={10}
            colorScheme={'pink'}
            bg={'pink.400'}
            _hover={{ bg: 'pink.500' }}>
            Get started
          </Button>
        </Link>
        </Stack>
      </Stack>
      </HomepageSection>
      <HomepageSection id="section1" >
      <Stack
        textAlign={'center'}
        align={'center'}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={800}
          fontSize={{ base: '3xl', sm: '4xl', md: '8xl' }}
          lineHeight={'110%'}>
          More air{' '}
          <Text as={'span'} color={'orange.400'}>
            More Power
          </Text>
        </Heading>
        <Text color={'gray.500'} maxW={'3xl'}>
          Never miss a meeting. Never be late for one too. Keep track of your
          meetings and receive smart reminders in appropriate times. Read your
          smart “Daily Agenda” every morning.
        </Text>
        <Stack spacing={6} direction={'row'}>
        <Link as="/dashboard" href="/dashboard">
          <Button
            rounded={'lg'}
            size={'lg'}
            px={10}
            colorScheme={'pink'}
            bg={'pink.400'}
            _hover={{ bg: 'pink.500' }}>
            Get started
          </Button>
        </Link>
        </Stack>
      </Stack>
      </HomepageSection>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

