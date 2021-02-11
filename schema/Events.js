cube(`Events`, {
  sql: `SELECT * FROM \`demoDatabase\`.events`,
  
  refreshKey: {
    sql: `SELECT UNIX_TIMESTAMP()`
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    },
    
    clicks: {
      sql: `clicks`,
      type: `sum`,
      title: 'Clicks'
    }
  },
  
  dimensions: {
    name: {
      sql: `name`,
      type: `string`
    }
  }
});
