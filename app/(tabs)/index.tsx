import { useEffect, useState } from 'react';
import { Image, StyleSheet, Platform, View, NativeSyntheticEvent, TextInputChangeEventData, ScrollView, FlatList } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedButton } from '@/components/themedButton';
import { notaType } from '@/database/database';
import { createNote, deleteNote, getAllNotes } from '@/database/crudOperations';
import ThemedCard from '@/components/ThemedCard';

export default function HomeScreen() {
  const [note, setNote] = useState<string>("");
  const [noteData, setNoteData] = useState<notaType[]>([]);

  const onChangeText = (e: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    setNote(e.nativeEvent.text);
  }

  const getAllData = async () => {
    const data = await getAllNotes();
    setNoteData(data);
  }

  const AddNote = async () => {
    if (note.trim() === "") return;
    try {
      const newNoteId = await createNote(note, 1);

      const newNote: notaType = {
        id: newNoteId,
        titulo: note,
        id_tipo_nota: 1
      };

      setNoteData(prevNotes => [...prevNotes, newNote]);
      setNote("");
      console.log("Nota agregada");
    } catch (error) {
      console.log("Error al agregar la nota:", error);
    }
  }

  const DeleteNote = async (id: number) => {
    await deleteNote(id);
    getAllData();
  }

  useEffect(() => {
    getAllData();
  }, [])

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={{
            uri: "https://images.unsplash.com/photo-1496660879542-a78ca4fc8b0c?q=80&w=1801&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Notes</ThemedText>
      </ThemedView>
      <ThemedView style={[styles.stepContainer, { paddingHorizontal: 32 }]}>
        <View style={{ width: "100%", flexDirection: "row" }}>
          <ThemedInput
            type='flat'
            placeholder='Desciption'
            style={{ width: "80%" }}
            value={note}
            onChange={onChangeText}
          />
          <ThemedButton
            title='+'
            onPress={AddNote}
            mode='contained'
            colorType='primary'
            style={{ marginLeft: 5, width: "15%" }}
          />
        </View>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <FlatList
          data={noteData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ThemedCard data={item} onDelete={DeleteNote} />
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
          scrollEnabled={false}
        />
        {noteData.length === 0 && (
          <ThemedView>
            <ThemedText type="defaultSemiBold" lightColor='rgba(0,0,0,0.6)' style={{ alignSelf: "center" }}>Agrega una nueva nota</ThemedText>
            <ThemedView style={{ alignSelf: "center", paddingTop: 10 }}>
              <FontAwesome6 name="face-grin" size={30} color="rgba(0,0,0,0.6)" />
            </ThemedView>
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 32
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
