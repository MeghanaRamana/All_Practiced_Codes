public class BarChartController {
    @AuraEnabled(cacheable=true)
    public static List<AggregateResult> getOpportunities(){
        return [SELECT Field, COUNT(Id) Id, MAX(CreatedDate) CrDate, MAX(CreatedBy.Name), COUNT(DataType) Dtp
        FROM EMS_Position__History
        GROUP BY Field];
        
    }
}