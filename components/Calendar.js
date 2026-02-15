export default {
  props: ['calendar', 'month', 'currentDay', 'currentMonth', 'dayColor', 'highlightToday'],
  template: `
    <div id="japanese-calendar" class="japanese-calendar">
      <div class="calendar-header">📅 {{ month }}月 Calendar.exe</div>
      <table class="calendar-table">
        <thead>
          <tr>
            <td class="calendar-sunday">日</td>
            <td>月</td>
            <td>火</td>
            <td>水</td>
            <td>木</td>
            <td>金</td>
            <td class="calendar-saturday">土</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, wIndex) in calendar" :key="wIndex">
            <td v-for="(day, dIndex) in week" :key="dIndex" :style="[dayColor(dIndex), highlightToday(day)]">
              {{ day || '' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
};
