import { useEffect, useRef, useState } from "react";
import { Modal, Platform, TextInput, TouchableOpacity } from "react-native";
import { Button } from "../Button";
import { Close } from "../Icons/Close";
import { Text } from "../Text";
import { Form, Header, Input, ModalBody, Overlay } from "./styles";

interface TablemodalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave }: TablemodalProps) {
  const [table, setTable] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (visible) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  function handleSave() {
    setTable('');
    onSave(table);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height': 'padding'} >
        <ModalBody>
          <Header>
            <Text weight="600">Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666"></Close>
            </TouchableOpacity>

          </Header>

          <Form>
            <Input
              ref={inputRef}
              placeholder="Número da mesa"
              placeholderTextColor="#666"
              keyboardType="number-pad"
              onChangeText={setTable}
            />
            <Button onPress={handleSave} disabled={table.length === 0}> Salvar</Button>
          </Form>

        </ModalBody>
      </Overlay>
    </Modal>
  )
}
