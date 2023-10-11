@isTest
public class GoogleIntegrationMock implements HttpCalloutMock {
    public HTTPResponse respond(HTTPRequest request) {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('{"results" : [{"address_components" : [{"long_name" : "277", "short_name" : "277", "types" : [ "postal_code" ]},{"long_name" : "Bedford Avenue","short_name" : "Bedford Ave","types" : [ "route" ]},{"long_name" : "United States","short_name" : "US","types" : [ "country", "political" ]}] }]}');
        response.setStatusCode(200);
        return response;
    }
}