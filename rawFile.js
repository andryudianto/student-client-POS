const googlePage = 'http://google.com'
const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return (<TouchableOpacity onPress={handlePress} style={{ elevation: 3, backgroundColor: '#ffff', borderRadius: 50, padding: 10, alignItems: 'center', marginRight: 10}}><Icon name="book" color="#57697A" size={25}/></TouchableOpacity>);
};