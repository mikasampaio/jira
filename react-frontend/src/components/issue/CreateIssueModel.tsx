import {
  Button,
  ButtonGroup,
  ChakraProvider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';
import ResizeTextarea from 'react-textarea-autosize';
import { selectMembers } from '../../api/project.endpoint';
import { types, priorities } from '../../category';
import DropDown from '../util/DropDown';
import FormWithLabel from '../util/FormWithLabel';
import Item from '../util/Item';

interface Props {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateIssueModel = (props: Props) => {
  const { isOpen, setIsOpen } = props;
  const { members } = selectMembers(1);
  const ddMembers = members?.map(({ username, profileUrl }) => ({
    text: username,
    icon: profileUrl,
  }));
  const [type, setType] = useState(0);

  return (
    <ChakraProvider>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size='xl'>
        <ModalOverlay bgColor='#0d67cc30' />
        <ModalContent borderRadius={2}>
          <ModalHeader>
            <Text fontWeight={500} fontSize={19}>
              Create Issue
            </Text>
          </ModalHeader>
          <ModalBody>
            <FormWithLabel label='Issue tye'>
              <DropDown list={types} updateHandler={setType} type='normal' />
            </FormWithLabel>
            <FormWithLabel label='Short summary'>
              <Input
                size='sm'
                variant='filled'
                borderWidth={1}
                borderColor='gray.300'
                _focus={{ borderWidth: 2 }}
              />
            </FormWithLabel>
            <FormWithLabel label='Description'>
              <Textarea
                minH='unset'
                overflow='hidden'
                resize='none'
                minRows={3}
                as={ResizeTextarea}
                borderRadius={2}
              />
            </FormWithLabel>
            {ddMembers && (
              <FormWithLabel label='Reporter'>
                <Button
                  display='flex'
                  justifyContent='start'
                  size='sm'
                  w='full'
                  borderWidth={1}
                  borderColor='gray.300'
                  borderRadius={3}
                  px={4}
                >
                  <Item icon={ddMembers[0].icon} text='Yhwach' className='w-6 h-6 mr-4' />
                </Button>
              </FormWithLabel>
            )}
            {ddMembers && (
              <FormWithLabel label='Assignee'>
                <DropDown list={ddMembers} updateHandler={setType} type='multiple' />
              </FormWithLabel>
            )}
            <FormWithLabel label='Issue type'>
              <DropDown list={priorities} updateHandler={setType} type='normal' />
            </FormWithLabel>
          </ModalBody>
          <ModalFooter>
            <Button size='sm' fontSize={16} fontWeight={500} variant='ghost' mr={4}>
              cancel
            </Button>
            <Button
              size='sm'
              fontSize={16}
              fontWeight={500}
              borderRadius={3}
              colorScheme='messenger'
            >
              create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CreateIssueModel;
