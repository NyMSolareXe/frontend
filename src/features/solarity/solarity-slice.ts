import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError } from 'axios'

const primary_url = 'http://172.25.158.51:5555'

interface organization {
  id: number
  name: string
  address: string
  phone: string
}

interface RemoveModalInterface extends CustomersInterface {
  show: boolean
}

interface ErrorModalInterface {
  show: boolean
  title: string
  message: string
  time: string
}

export interface CustomersInterface {
  id: number
  name: string
  location: string
}

export interface CustomerArray {
  customers: CustomersInterface[]
}

interface CustomersWithOrganizationInterface {
  customer_id: number
  customer_Name: string
  customer_Location: string
  organization_id: number
  organization_Name: string
}

interface CustomerOrganization {
  customer_id: number
  organization_id: number
}

interface solarityState {
  organizations: organization[]
  currentOrganization: organization | undefined
  customersForOrganization: CustomersInterface[]
  modal: RemoveModalInterface
  createOrganization: organization
  errorModal: ErrorModalInterface
  editOrganization: organization
  customersForAllOrganization: CustomersWithOrganizationInterface[]
  createCustomer: CustomersInterface
  editCustomer: CustomersInterface
  createCustomerOrganization: CustomerOrganization
}

const emptyOrganization = {
  id: 0,
  name: '',
  address: '',
  phone: '',
}

const emptyCustomer = {
  id: 0,
  name: '',
  location: '',
}

const emptyCustomerOrganization = {
  customer_id: 0,
  organization_id: 0
}

const initialState: solarityState = {
  organizations: [],
  currentOrganization: undefined,
  customersForOrganization: [],
  modal: {
    id: 0,
    name: '',
    location: '',
    show: false,
  },
  createOrganization: {
    ...emptyOrganization,
  },
  errorModal: {
    show: false,
    title: '',
    message: '',
    time: '',
  },
  editOrganization: {
    ...emptyOrganization,
  },
  customersForAllOrganization: [],
  createCustomer: {
    ...emptyCustomer,
  },
  editCustomer: {
    ...emptyCustomer,
  },
  createCustomerOrganization: {
    ...emptyCustomerOrganization
  }
}

export const getAllOrganizations = createAsyncThunk('fetchData/getAllOrganizations', async () => {
  const url = `${primary_url}/api/v1/organization/getAllOrganization`
  let solar
  try {
    const httpResponse = await axios.get(url)
    solar = {
      success: true,
      data: httpResponse.data.data.organization,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

export const getAllCustomerForOrganization = createAsyncThunk(
  'fetchData/getAllCustomerForOrganization',
  async (empty: string = '', { getState }: any) => {
    const state: solarityState = getState().solarity
    const jsonData = {
      organization_id: state.currentOrganization?.id,
    }
    const url = `${primary_url}/api/v1/customer_organization/getAllCustomerForOrganization`
    let solar
    try {
      const httpResponse = await axios.post(url, jsonData)
      solar = {
        success: true,
        data: httpResponse.data.data.customers,
      }
    } catch (error: any | AxiosError) {
      solar = {
        success: false,
        data: error.response.data,
      }
    }
    return solar
  }
)

export const deleteCustomerFromOrganization = createAsyncThunk(
  'fetchData/deleteCustomerFromOrganization',
  async (empty: string = '', { getState }: any) => {
    const state: solarityState = getState().solarity
    const jsonData = {
      customer_id: state.modal.id,
      organization_id: state.currentOrganization?.id,
    }
    const url = `${primary_url}/api/v1/customer_organization/deleteCustomerFromOrganization`
    let solar
    try {
      const httpResponse = await axios.delete(url, { data: jsonData })
      solar = {
        success: true,
        data: httpResponse.data.data.customers,
      }
    } catch (error: any | AxiosError) {
      solar = {
        success: false,
        data: error.response.data,
      }
    }
    return solar
  }
)

export const createOrganization = createAsyncThunk('fetchData/createOrganization', async (empty: string = '', { getState }: any) => {
  const state: solarityState = getState().solarity
  const { name, address, phone } = state.createOrganization
  const jsonData = { name, address, phone }
  const url = `${primary_url}/api/v1/organization/create`
  let solar
  try {
    const httpResponse = await axios.post(url, jsonData)
    solar = {
      success: true,
      data: httpResponse.data.data.customers,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

export const updateOrganization = createAsyncThunk('fetchData/updateOrganization', async (empty: string = '', { getState }: any) => {
  const state: solarityState = getState().solarity
  const { id, name, address, phone } = state.editOrganization
  const jsonData = { id, name, address, phone }
  const url = `${primary_url}/api/v1/organization/edit`
  let solar
  try {
    const httpResponse = await axios.put(url, jsonData)
    solar = {
      success: true,
      data: httpResponse.data.data.customers,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

export const deleteOrganization = createAsyncThunk('fetchData/deleteOrganization', async (empty: string = '', { getState }: any) => {
  const state: solarityState = getState().solarity
  const jsonData = { id: state.editOrganization.id }
  const url = `${primary_url}/api/v1/organization/delete`
  let solar
  try {
    const httpResponse = await axios.delete(url, { data: jsonData })
    solar = {
      success: true,
      data: httpResponse.data.data.customers,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

export const getAllCustomersWithOrganization = createAsyncThunk(
  'fetchData/getAllCustomersWithOrganization',
  async (empty: string = '', { getState }: any) => {
    const url = `${primary_url}/api/v1/customer_organization/getAllCustomersWithOrganization`
    let solar
    try {
      const httpResponse = await axios.get(url)
      solar = {
        success: true,
        data: httpResponse.data.data.customers,
      }
    } catch (error: any | AxiosError) {
      solar = {
        success: false,
        data: error.response.data,
      }
    }
    return solar
  }
)

export const createCustomer = createAsyncThunk('fetchData/createCustomer', async (empty: string = '', { getState }: any) => {
  const state: solarityState = getState().solarity
  const { name, location } = state.createCustomer
  const jsonData = { name, location }
  const url = `${primary_url}/api/v1/customer/create`
  let solar
  try {
    const httpResponse = await axios.post(url, jsonData)
    solar = {
      success: true,
      data: httpResponse.data.data.customers,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

export const updateCustomer = createAsyncThunk('fetchData/updateCustomer', async (empty: string = '', { getState }: any) => {
  const state: solarityState = getState().solarity
  const { id, name, location } = state.editCustomer
  const jsonData = { id, name, location }
  const url = `${primary_url}/api/v1/customer/edit`
  let solar
  try {
    const httpResponse = await axios.put(url, jsonData)
    solar = {
      success: true,
      data: httpResponse.data.data.customers,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

export const addCustomerOrganization = createAsyncThunk('fetchData/addCustomerOrganization', async (empty: string = '', { getState }: any) => {
  const state: solarityState = getState().solarity
  const { customer_id, organization_id } = state.createCustomerOrganization
  const jsonData = { customer_id, organization_id }
  const url = `${primary_url}/api/v1/customer_organization/create`
  let solar
  try {
    const httpResponse = await axios.post(url, jsonData)
    solar = {
      success: true,
      data: httpResponse.data.data.customers,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

export const deleteCustomerHTTP = createAsyncThunk('fetchData/deleteCustomer', async (empty: string = '', { getState }: any) => {
  const state: solarityState = getState().solarity
  const jsonData = { id: +state.editCustomer.id }
  const url = `${primary_url}/api/v1/customer/delete`
  let solar
  try {
    const httpResponse = await axios.delete(url, { data: jsonData })
    solar = {
      success: true,
      data: httpResponse.data.data.customers,
    }
  } catch (error: any | AxiosError) {
    solar = {
      success: false,
      data: error.response.data,
    }
  }
  return solar
})

const solaritySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updateCurrentOrganization(state, action: PayloadAction<organization>) {
      state.currentOrganization = action.payload
    },
    ShowModelRemoveCustomerFromOrganization(state, action: PayloadAction<RemoveModalInterface>) {
      state.modal = action.payload
    },
    updateCreateOrganizationFields(state, action: PayloadAction<organization>) {
      state.createOrganization = action.payload
    },
    ClearErrorModal(state, action: PayloadAction<ErrorModalInterface>) {
      state.errorModal = action.payload
    },
    updateEditOrganizationFields(state, action: PayloadAction<organization>) {
      state.editOrganization = action.payload
    },
    updateCreateCustomerFields(state, action: PayloadAction<CustomersInterface>) {
      state.createCustomer = action.payload
    },
    updateEditCustomerFields(state, action: PayloadAction<CustomersInterface>) {
      state.editCustomer = action.payload
    },
    updateCreateCustomerOrganizationFields(state, action: PayloadAction<CustomerOrganization>) {
      state.createCustomerOrganization = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrganizations.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.organizations = action.payload.data
        }
      })
      .addCase(getAllCustomerForOrganization.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.customersForOrganization = action.payload.data
        }
      })
      .addCase(deleteCustomerFromOrganization.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.modal = {
            id: 0,
            name: '',
            location: '',
            show: false,
          }
        }
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.createOrganization = { ...emptyOrganization }
        } else {
          state.errorModal = parseError(action)
        }
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.editOrganization = { ...emptyOrganization }
        } else {
          state.errorModal = parseError(action)
        }
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.editOrganization = { ...emptyOrganization }
        } else {
          state.errorModal = parseError(action)
        }
      })
      .addCase(getAllCustomersWithOrganization.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.customersForAllOrganization = action.payload.data
        } else {
          state.errorModal = parseError(action)
        }
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.createCustomer = { ...emptyCustomer }
        } else {
          state.errorModal = parseError(action)
        }
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.editCustomer = { ...emptyCustomer }
        } else {
          state.errorModal = parseError(action)
        }
      })
      .addCase(addCustomerOrganization.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.createCustomerOrganization = { ...emptyCustomerOrganization }
        } else {
          state.errorModal = parseError(action)
        }
      })
      .addCase(deleteCustomerHTTP.fulfilled, (state, action) => {
        if (action.payload.success === true) {
          state.editCustomer = { ...emptyCustomer }
        } else {
          state.errorModal = parseError(action)
        }
      })
  },
})

const parseError = (action: any) => {
  const errors = action.payload.data.data
  const messageArray = []
  for (const key of Object.keys(errors)) {
    for (const key2 of Object.keys(errors[key])) {
      messageArray.push(`${key} ${key2}: ${errors[key][key2]}`)
    }
  }
  return {
    show: true,
    title: 'Error',
    message: messageArray.join('\n\n'),
    time: action.payload.data.time,
  }
}

export const {
  updateCurrentOrganization,
  ShowModelRemoveCustomerFromOrganization,
  updateCreateOrganizationFields,
  ClearErrorModal,
  updateEditOrganizationFields,
  updateCreateCustomerFields,
  updateEditCustomerFields,
  updateCreateCustomerOrganizationFields
} = solaritySlice.actions

export default solaritySlice.reducer
