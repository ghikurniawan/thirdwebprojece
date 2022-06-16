import Link from 'next/link';
import { ReactElement } from 'react';
import Layout from '../components/homepage/Layout';
import { HomepageSection } from '../components/homepage/Section';
import {
  Heading,
  Stack,
  Text,
  Button,
} from '@chakra-ui/react';

export default function Home(){
  return (
    <div>
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
            rounded={'full'}
            px={6}
            colorScheme={'orange'}
            bg={'orange.400'}
            _hover={{ bg: 'orange.500' }}>
            Get started
          </Button>
        </Link>
          <Button rounded={'full'} px={6}>
            Learn more
          </Button>
        </Stack>
      </Stack>
      </HomepageSection>
    </div>
  );
};

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>;

