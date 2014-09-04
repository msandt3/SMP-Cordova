function executeMAQuery(chartObj, name, args)
{
	if (SAP.Util.executeMAQuery(chartObj, name, args)) {
		return;
	}
	
	/*
	//example to get memory data
	var dataTable;
	//Chart Types
	if (name == "revenue")	
		getRevenueData(chartObj,args);
	*/
	
};

/*
function getRevenueData(chart,args){
		var dataTable = new $MA.DataTable();
		
		// All columns required by chart category, series & values must be created 
		dataTable.addColumn("year", "number");
		dataTable.addColumn("revenue", "number");
		
		// Get your data and insert to datatable
		dataTable.addRow([2006, 500000]);
		dataTable.addRow([2007, 700000]);
		dataTable.addRow([2008, 1000000]);
		dataTable.addRow([2009, 800000]);
		dataTable.addRow([2010, 1200000]);

		dataTable.refresh();
		chart.setDataTable(dataTable);
		chart.refresh();
	}
*/