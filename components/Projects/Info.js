import React from 'react'
import styled from 'styled-components'
import { designTokens } from '@components/Theme/designTokens'
import { Box, MapPin, User, Calendar, Smartphone } from 'react-feather'
import Chip from '@components/Chip'

const Table = styled.table`
  font-size: ${designTokens.sizing._xs};
  th {
    text-align: left;
    color: var(--grey600);
    width: calc(${designTokens.space[8]} + ${designTokens.space[2]});
    font-family: ${designTokens.fonts.body};
  }
  th, td {
    vertical-align: top;
  }
  th {
    padding: ${designTokens.space[1]} 0;
  }
`

const TableHeader = styled.div`
  display: inline-flex;
  align-items: center;
  padding-top: calc(${designTokens.space[1]}/2);
`

export const TableLabel = ({ icon, children }) => {
  return (
    <TableHeader>
      { icon && ( icon )}
      <span style={{ marginLeft: icon ? designTokens.space[2] : '0' }}>
        {children}
      </span>
    </TableHeader>
  )          
}

export const TableRow = ({icon, label, data}) => {
  return(
    <tr>
      <th>
        <TableLabel icon={icon}>
          {label}
        </TableLabel>
      </th>
      <td>
        {
          Array.isArray(data) ? (
            data.map((item, i) => (
              <Chip key={i} ghost mb={designTokens.space[1]} mt={designTokens.space[1]} mr={designTokens.space[1]}>{item}</Chip>
            ))
          )
          :
          (
            <Chip ghost mb={designTokens.space[1]} mt={designTokens.space[1]} mr={designTokens.space[1]}>{data}</Chip>
          )
        }
      </td>
    </tr>
  )
}

const Info = ({data}) => {
  return(
    <Table>
      <tbody>
        {
          data.location && (
            <TableRow
              icon={<MapPin size={'16'}/>}
              label={'Location'}
              data={data.location}
            />
          )
        }
        {
          data.role && (
            <TableRow
              icon={<User size={'16'}/>}
              label={'Roles'}
              data={data.role}
            />
          )
        }
        {
          data.date && (
            <TableRow
              icon={<Calendar size={'16'}/>}
              label={'Date'}
              data={data.date}
            />
          )
        }
        {
          data.spaces && (
            <TableRow
              icon={<Box size={'16'}/>}
              label={'Spaces'}
              data={data.spaces}
            />
          )
        }
        {
          data.platforms && (
            <TableRow
              icon={<Smartphone size={'16'}/>}
              label={'Platforms'}
              data={data.platforms}
            />
          )
        }
      </tbody>
    </Table>
  )
}

export default Info