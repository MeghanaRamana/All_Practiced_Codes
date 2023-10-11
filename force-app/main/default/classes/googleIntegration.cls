public class googleIntegration {
@future(callout=true)
    public static void reverseGeocode(set<Id> accId){
        list<Account> acclist= new list<Account>();
        For(Account Accnt : [Select Id,Name,geoloc__latitude__s,geoloc__longitude__s from Account where Id IN :accId]){
            
            system.debug(Accnt);
        if(accnt.geoloc__latitude__s!= Null && accnt.geoloc__longitude__s!=Null){
        string endpoint='https://maps.googleapis.com/maps/api/geocode/json?';
        string param='latlng='+Accnt.geoloc__latitude__s+','+Accnt.geoloc__longitude__s+'&key=AIzaSyAdaOHokyRwndivibQQvZr2UHyl5m-Bh1s';
        
        HttpRequest request= new HttpRequest();
        request.setEndpoint(endpoint + param);
        request.setMethod('GET');
        
        HttpResponse response= new Http().send(request);
            if(response.getStatusCode()== 200){
        Map<String, Object> responseMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        system.debug('ResponseMap===='+responseMap);
	    List<Object> results = (List<Object>) responseMap.get('results');
        system.debug(results);
        Map<String, Object> firstResult = (Map<String, Object>) results.get(0);
        system.debug(firstresult);
        String formattedAddress = (String) firstResult.get('formatted_address');
        system.debug('formattedaddress===='+formattedAddress);
        list<object> addressComponents=(list<object>) firstResult.get('address_components');
        system.debug('address components===='+addressComponents);
        String country = null;
        String zipcode = null;
        String street = null;
        for (Object component : addressComponents) {
            Map<String, Object> componentMap = (Map<String, Object>) component;
            List<Object> types = (List<Object>) componentMap.get('types');
            if (types.contains('country')) {
                country = (String) componentMap.get('long_name');
            } else if (types.contains('postal_code')) {
                zipcode = (String) componentMap.get('long_name');
            } else if (types.contains('route')) {
                street = (String) componentMap.get('long_name');
            }
            system.debug('Component map==='+componentMap);
            system.debug('types===='+types);
            
}
			system.debug('country=='+country+' ,,,street===   '+street+'  ,,,zipcode=====  '+zipcode);
     
           // Update the Account fields with the new values
            if (country != null) {
                accnt.BillingCountry = country;
            }
            if (street != null) {
                accnt.BillingStreet = street;
            }
            if (zipcode != null) {
                accnt.BillingPostalCode = zipcode;
            }
            acclist.add(accnt);
            
            }
                  } 
        }
        If(!acclist.isEmpty()){
            upsert acclist;
        }
    }
    }