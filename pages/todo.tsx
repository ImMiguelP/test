import { IconButton } from "@chakra-ui/button";
import { AddIcon, DeleteIcon, NotAllowedIcon } from "@chakra-ui/icons";
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
const bg = "/stranded.png";

type TodoType = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
};

function Todo() {
  const [text, setText] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("MyTodos")!));
  }, []);

  useEffect(() => {
    if (todos.length === 0) return;
    localStorage.setItem("MyTodos", JSON.stringify(todos));
  }, [todos]);

  const shortid = require("shortid");

  const handleSubmit = (event: any) => {
    event?.preventDefault();
    addTodo({
      id: shortid.generate(),
      text: text,
      completed: false,
      createdAt: new Date(),
    });
    setText("");
  };

  const addTodo = (todo: TodoType) => {
    if (text.length === 0) {
      return;
    } else {
      setTodos([todo, ...todos]);
    }
  };

  const delTodo = (id: string) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodo);
    localStorage.setItem("MyTodos", JSON.stringify(filteredTodo));
  };

  const clearTodo = () => {
    const empty: Array<TodoType> = [];
    setTodos(empty);
    localStorage.setItem("MyTodos", JSON.stringify(empty));
  };

  const editTodo = (id: string, value: string) => {
    const selectedTodo = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, text: value };
      }
      return todo;
    });
    console.log(selectedTodo);
    localStorage.setItem("MyTodos", JSON.stringify(selectedTodo));
  };

  return (
    <Box bgImage={bg} bgSize={"cover"} minH="100%" position={"relative"}>
      <Box
        bg={"rgba( 0, 0, 0, 0.55 )"}
        boxShadow={"0 8px 32px 0 rgba( 31, 38, 135, 0.37 )"}
        backdropFilter={"blur( 10.5px )"}
        minHeight="100vh"
      >
        <Navbar />
        <VStack h={"100%"} p={5} maxW={"7xl"} mx={"auto"} color={"white"}>
          <Text textAlign={"center"}>Your Handy To Do List</Text>
          {/* Todo Input */}
          <InputGroup>
            <Input
              bg={"#fff"}
              borderColor={"rgba( 255, 161, 0, 1 )"}
              borderRadius={"4px"}
              focusBorderColor={"#f67f1a"}
              color={"black"}
              type={"text"}
              placeholder={"ToDo..."}
              value={text}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
              onChange={(e: any) => setText(e.target.value)}
            />
            {/* HandleSubnit Button */}
            <InputRightElement>
              <IconButton
                size={"xs"}
                bg="#f67f1a"
                aria-label="Submit Todo"
                icon={<AddIcon />}
                onClick={handleSubmit}
              />
            </InputRightElement>
          </InputGroup>
          {/* Clear ToDo Button */}
          <Flex w={"100%"} pr={1.5} justifyContent={"space-between"}>
            <Text>Todo's Left : {todos.length === 0 ? "0" : todos.length}</Text>
            <IconButton
              size={"xs"}
              bg="#f67f1a"
              aria-label="Clear all todo's"
              icon={<NotAllowedIcon />}
              onClick={clearTodo}
            />
          </Flex>

          <Stack pb={5} w={"100%"}>
            <VStack
              mt={10}
              h={"550px"}
              overflowX={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                  height: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#f67f1a",
                  borderRadius: "15px",
                },
              }}
            >
              {todos.map((todo) => (
                <HStack key={todo.id} w={"100%"}>
                  <Flex w={"100%"}>
                    <Editable defaultValue={todo.text.toLocaleUpperCase()}>
                      <Tooltip label="Click to edit todo">
                        <EditablePreview
                          p={"10px"}
                          _hover={{
                            background: "gray.800",
                          }}
                        />
                      </Tooltip>
                      <EditableInput
                        border={"1px"}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            editTodo(todo.id, e.currentTarget.value);
                          }
                        }}
                      />
                    </Editable>
                    <Text fontSize={"10px"} pl={"10px"} color={"gray.400"}>
                      {moment(todo.createdAt).format("MMMM Do, YYYY @ h:mm a")}
                    </Text>
                  </Flex>

                  <VStack w={"100%"} align={"end"} pr={5}>
                    <IconButton
                      aria-label="Trash Can"
                      variant={"ghost"}
                      color={"red"}
                      icon={<DeleteIcon />}
                      size={"xs"}
                      onClick={() => delTodo(todo.id)}
                    />
                  </VStack>
                </HStack>
              ))}
            </VStack>
          </Stack>
        </VStack>
      </Box>
    </Box>
  );
}

export default Todo;
