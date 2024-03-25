import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button,FlatList,SafeAreaView,ScrollView,StyleSheet,Text, TouchableOpacity, View } from 'react-native';
import Clima from './api/Clima';
import ConditionSlugImg from './api/ConditionSVG';
import { SvgXml } from 'react-native-svg';
import { AntDesign,Feather,Ionicons,SimpleLineIcons,MaterialCommunityIcons} from '@expo/vector-icons';

const cidades = [
  {id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Recife',
  },
  { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Outra',
  }
];

export default function App() {
  const [list, setList] = useState([])
  const [temp, setTemp] = useState('')
  const [city, setCity] = useState('')
  const [description, setDescription] = useState('')
  const [time,setTime] = useState('')
  const [umidade,setUmidade] = useState('')
  const [vento,setVento] = useState('')
  const [chuva,setChuva] = useState('')
  const [max,setMax] = useState('')
  const [min,setMin] = useState('')
  const [date,setDate] = useState('')
  const [condition_slug ,setCondition_slug] = useState('')
  const [condition_slugImage ,setCondition_slugImage] = useState<string | null>(null);  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const options = ['Recife', 'Rio de Janeiro'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option:any) => {
    setSelectedOption(option);
    setIsOpen(false);
    carregarClima(option)
  };
    const carregarClima = async (nomeCidade:any) => {
      try {
        console.log(nomeCidade)
        const response = await Clima.getCidadePorNome(nomeCidade);
        console.log(response.data.results.condition_slug)
        const conditionImage = await ConditionSlugImg.getConditionSlugImg(response.data.results.condition_slug)
        setCondition_slugImage(conditionImage.data)
        setList(response.data.results.forecast);
        setTemp(response.data.results.temp);
        setCity(response.data.results.city);
        setTime(response.data.results.time);
        setDate(response.data.results.date);
        setMax(response.data.results.forecast[0].max)
        setMin(response.data.results.forecast[0].min)
        setChuva(response.data.results.forecast[0].rain_probability)
        setUmidade(response.data.results.humidity)
        setVento(response.data.results.forecast[0].wind_speedy)
        setCondition_slug(response.data.results.condition_slug);
        console.log(city)
      } catch (error) {
        console.warn(error);
      }
    }

  return (
    <View className='flex-1 flex-col  bg-blue-800 justify-center justify-items-center '>
    <View className='flex-0 flex-row justify-center mt-5'>
    <TouchableOpacity onPress={toggleDropdown}>
        <View >
          <Text className='text-white px-5 mt-9'>
          <Feather name="map-pin" size={15} color="white" />
            {selectedOption || 'Selecione uma cidade '} 
            <AntDesign name="caretdown" size={15} style={{}} color="white" />
        
          </Text>  
        </View>
      </TouchableOpacity>
      {isOpen && (
        <View >
          {options.map((option, index) => (
            <TouchableOpacity 
              key={index}
              onPress={() => {handleOptionSelect(option) ; carregarClima(selectedOption)} }>
              <Text className='text-white px-5 mt-9'>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <TouchableOpacity className='pl-56 mt-9 mr-5'>
       <Ionicons name="notifications-outline" size={15} color="white" />   
       </TouchableOpacity>
       </View>
       <View className='flex-1 flex-col justify-top items-center mt-8 '>
       <TouchableOpacity><SvgXml  xml={condition_slugImage} /></TouchableOpacity>
       <Text className='text-white text-4xl font-bold'>{temp}º</Text>
       <Text className='text-white text-base font-normal'>Precipitations</Text>
       <Text className='text-white text-base font-normal'>Max.: {max} Min.: {min}</Text>
       <Text className='text-white text-base font-normal'>{min}</Text>
       <View className='flex-row'>
       <View style={{ backgroundColor: '#0D3987',borderTopLeftRadius: 20, borderBottomLeftRadius: 20, padding: 10, width: '30%', alignItems: 'center', justifyContent: 'center' }}>
        <Text className='text-white' ><SimpleLineIcons name="drop" size={15} color="white" /> {chuva} %</Text>
      </View>
      <View style={{ backgroundColor: '#0D3987', padding: 10, width: '30%', alignItems: 'center', justifyContent: 'center' }}>
        <Text className='text-white' ><Feather name="thermometer" size={15} color="white" />{umidade} %</Text>
      </View>
      <View style={{ backgroundColor: '#0D3987', borderTopRightRadius: 20, borderBottomRightRadius: 20, padding: 10, width: '30%', alignItems: 'center', justifyContent: 'center' }}>
        <Text className='text-white' ><MaterialCommunityIcons name="weather-windy" size={15} color="white" /> {vento}</Text>
      </View>
      </View>
      
      <View className='flex-row mt-5'>
      <View style={{ backgroundColor: '#0D3987',borderTopLeftRadius: 20, borderBottomLeftRadius: 20,borderTopRightRadius: 20, borderBottomRightRadius: 20, padding: 10, width: '30%', alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView horizontal={true}>
      <View className='flex-row'>
       <Text className='text-white text-lg'>Today </Text><Text className='text-white text-lg'>mar,{date.substring(0,2)}</Text>
        <Text>{JSON.stringify(list,null,2)}</Text>
       </View>
       </ScrollView>
      </View>
        </View>
       </View>
       </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});